const Categorias = require("../models/Categorias");
const Productos = require("../models/Productos");

exports.obtenerProductosbyId = async ( req, res ) => {

    const {id} = req.params;

    try{
        const producto = await Productos.findById(id);
        
        res.json({ producto });
    }catch(error){
        console.log(error);
    }
};

exports.obtenerProductosHome = async ( req, res ) => {

    try{
        const productos = await Productos.find();
        
        res.json({ productos });
    }catch(error){
        console.log(error);
    }
};


exports.obtenerProductos = async ( req, res ) => {
    //res.status(404).json({msg: "obtener producto"});
   /* try{
        
        const productos = await Productos.find({ categoriaId: req.params.id });
        console.log(productos);
        res.json({ productos });
    }catch(error){
        console.log(error);
    }*/

    const { id } = req.params
    const producto = await Productos.find().where("categoriaId").equals(id);
    res.json(producto);
};

exports.crearProductos = async ( req, res ) => {
    //res.status(404).json({msg: "crear producto"});
    const {categoriaId} = req.body;
    try{
        console.log(categoriaId);
        //revisar unico producto registrado
        const foundCategory = await Categorias.findById(categoriaId);
        console.log(foundCategory);
        const categoria = req.body;
        /*if (producto) {
            return res.status(404).json({ msg: "El producto ya existe"});
        }*/
        
        //Crear el nuevo producto
        const producto = new Productos(req.body);


       //producto.categoriaId = req.categoria.categoriaId;

        producto.save();

        res.json(producto);

    }catch(error){
        console.log(error);
    }
};

exports.actualizarProductos = async ( req, res ) => {
    //res.status(404).json({msg: "actualizar producto"});
    const { id } = req.params;
    const productos = await Productos.findById(id);

    if(!productos){
        return res.status(400).json({msg: "producto no encontrado"});
    }

    productos.nombre = req.body.nombre || productos.nombre;

    productos.nombre = req.body.nombre || productos.nombre;
    productos.descripcion = req.body.descripcion || productos.descripcion;
    productos.stock = req.body.stock || productos.stock;
    productos.precio = req.body.precio || productos.precio;
    productos.imagen = req.body.imagen || productos.imagen;
    productos.categoriaId = productos.categoriaId;/*SIGNIFICA QUE NO PUEDE SER MODIFICADO DESDE EL FRONT*/

    productos.save();

    res.json({productos});
};

exports.borrarProductos = async ( req, res ) => {
    //res.status(404).json({msg: "borrar producto"});
    try{
        await Productos.deleteOne({ _id: req.params.id });
        res.json({ msg: "Producto eliminado"});
    }catch(error){
        console.log(error);
    }
};