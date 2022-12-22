const express = require("express");
const router = express.Router();
const authMidd = require("../middleware/authMidd");
const categoriasControllers = require("../controllers/categoriasControllers");

router.get("/", categoriasControllers.obtenerCategoriaHome);
router.get("/", authMidd, categoriasControllers.obtenerCategoria);
router.get("/:id", authMidd, categoriasControllers.obtenerCategoriaId);
router.post("/", authMidd, categoriasControllers.crearCategoria);
router.put("/:id", authMidd, categoriasControllers.actualizarCategoria);
router.delete("/:id", authMidd, categoriasControllers.borrarCategoria);

//definir las rutas
module.exports = router;