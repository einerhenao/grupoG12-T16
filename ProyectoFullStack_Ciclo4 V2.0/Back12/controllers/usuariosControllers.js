const Usuario = require("../models/Usuarios");
const bcryptjs = require("bcryptjs")

exports.crearUsuario = async (req, res) => {
    //console.log(req.body);
    //res.json({msg: "Desde controller post"})
    const {password, email} = req.body;
    try{
        //revisar unico usuario registrado
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(404).json({ msg: "El usuario ya existe"});
        }
        //Crear el nuevo usuario
        usuario = new Usuario(req.body);
        
        //hash
        usuario.password = await bcryptjs.hash(password,10);
        
        //guardar en la db
        const usuarioAlmacenado = await usuario.save();
    
        res.json(usuarioAlmacenado);

    }catch(error){
        console.log(error)
    }


   
};


