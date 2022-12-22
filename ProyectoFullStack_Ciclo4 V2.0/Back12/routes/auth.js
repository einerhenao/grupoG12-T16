const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const authMidd = require("../middleware/authMidd");
router.post(
    "/",
    authControllers.autenticarUsuario
);

router.get("/" , authMidd, authControllers.usuarioAutenticado);

module.exports = router;