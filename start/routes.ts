import router from "@adonisjs/core/services/router";
const HealthChecksController = () => import("#controllers/health_checks_controller");

// Health & Monitoring
router.get("/health", [HealthChecksController]);
// router.get('/metrics', '');

// Orders reading
router.get("/orders", "OrdersController.index");
router.get("/orders/:id", "OrdersController.show");

// Orders lifecycle actions
router.post("/orders/:orderNumber/accept", "OrdersController.accept");
router.post("/orders/:orderNumber/process", "OrdersController.startProcessing");
router.post("/orders/:orderNumber/pack", "OrdersController.pack");
router.post("/orders/:orderNumber/ship", "OrdersController.ship");
router.post("/orders/:orderNumber/deliver", "OrdersController.deliver");

// Returns reading
router.get("/returns", "ReturnsController.index");
router.get("/returns/:returnNumber", "ReturnsController.show");

// Returns lifecycle actions
router.post("/returns/:returnNumber/receive", "ReturnsController.receive");
router.post("/returns/:returnNumber/complete", "ReturnsController.complete");

router.get("/", async () => {
  return {
    hello: "world",
  };
});
