import app from "@adonisjs/core/services/app";
import { HttpContext, ExceptionHandler } from "@adonisjs/core/http";
import logger from "@adonisjs/core/services/logger";

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction;

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(err: unknown, ctx: HttpContext) {
    const { response, request } = ctx;

    const e = err as ErrorType;
    const code = e.code;

    switch (code) {
      case "E_ROW_NOT_FOUND":
        return response.status(404).send({
          error: {
            status: 404,
            message: "Resource not found",
            path: request.url(),
            stack: this.debug ? e.stack : undefined,
          },
        });
      default:
        return super.handle(err, ctx);
    }
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(err: unknown, ctx: HttpContext) {
    const { request } = ctx;

    const e = err as ErrorType;
    const code = e.code;

    logger.error({
      message: e.message,
      code: e.code,
      stack: e.stack,
      url: request.url(),
      method: request.method(),
    });

    // Optionally forward to Sentry, Datadog etc. (to do)
    return super.report(err, ctx);
  }
}

type ErrorType = { code?: string; message?: string; stack?: string };
