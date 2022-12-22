const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosControllers")


router.post(
    "/",
    usuarioController.crearUsuario
);

/*router.get("/", (req, res) => {
    res.json({msg:"desde router get"});
});

router.post("/", (req, res) => {
    res.json({msg:"desde router post"});
});

router.put("/", (req, res) => {
    res.json({msg:"desde router put es para actualizar"});
});

router.delete("/", (req, res) => {
    res.json({msg:"desde router delete es para eliminar"});
});*/



//definir las rutas
module.exports = router;