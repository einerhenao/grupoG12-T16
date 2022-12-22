const express = require("express");
const router = express.Router();
const authMidd = require("../middleware/authMidd");
const productosControllers = require("../controllers/productosControllers");

router.get("/productobyId/:id", authMidd, productosControllers.obtenerProductosbyId);
router.get("/", productosControllers.obtenerProductosHome );
router.get("/:id", authMidd, productosControllers.obtenerProductos);
router.post("/", authMidd, productosControllers.crearProductos );
router.put("/:id", authMidd, productosControllers.actualizarProductos);
router.delete("/:id", authMidd, productosControllers.borrarProductos);

//definir las rutas
module.exports = router;