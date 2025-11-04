import logger from '@adonisjs/core/services/logger'
import { connect, NatsConnection, StringCodec } from 'nats'

let nc: NatsConnection | null = null
const sc = StringCodec()

export async function getNats(): Promise<NatsConnection> {
  if (nc) return nc

  nc = await connect({ servers: process.env.NATS_URL })

  logger.info(`Connected to NATS server at ${nc.getServer()}`)

  return nc
}

export async function emit(subject: string, payload: unknown) {
  const nc = await getNats()
  const msg = JSON.stringify(payload)
  nc.publish(subject, sc.encode(msg))
  logger.info(`Published NATS event: ${subject}: ${msg}`)
}

export async function subscribe(subject: string, handler: (data: unknown) => Promise<void> | void) {
  const nc = await getNats()
  const sub = nc.subscribe(subject)

  logger.info(`👂 Listening on NATS subject: ${subject}`)

  for await (const msg of sub) {
    try {
      const decoded = JSON.parse(sc.decode(msg.data))
      await handler(decoded)
    } catch (err) {
      logger.error(`Error handling NATS message on ${subject}: ${err}`)
    }
  }
}
