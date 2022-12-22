import React from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import crud from '../../conexiones/crud';
const cargarProductos = require("./HomeProductos");

const ViewProductos = ({producto}) => {
    const navigate = useNavigate();
    const {nombre, descripcion, stock, precio, imagen} = producto;
    const actualizarProducto = async () => {
        navigate(`/actualizar-producto/${producto._id}`)
    }

    const borrarProducto = async () => {
        swal({
            title: "Estas seguro de eliminar este producto?",
            text: "Una vez eliminado no se puede recuperar este producto",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //preventDefault();
                    const response = crud.DELETE(`/api/productos/${producto._id}`);
                    console.log(response.msg);
                    //const mensaje = "Producto eliminado"
                    //const mensaje = response.msg;
                    if (response) {
                        swal("Tu categoria ha sido eliminada correctamente", {
                            icon: "success",
                        });
                    }
                    window.location.reload(); //TAREA IMPORTAR FUNCION CARGARPRODUCTOS DE HOME PRODUCTOS PD: NO SABEMOS COMPO HACERLO
                } else {
                    swal("Se cancelo la acción");
                }
            });
    }

    return(
        <div className="border-solid border border-black p-5 flex justify-between items-center">
            <div className="flex flex-col items-star bg-gray-100 p-5 ">
                <p className="mb-1  text-black font-bold font-sans">Nombre: {nombre}</p>
                <p className="mb-1  text-black font-bold font-sans">Descripción: {descripcion}</p>
                <p className="mb-1  text-black font-bold font-sans">Stock: {stock}</p>
                <p className="mb-1  text-black font-bold font-sans">Precio:{precio}</p>
                <img src={imagen} width='150' height='150'></img>
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
                <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-center rounded-lg" onClick={actualizarProducto}>Editar</button>
                <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-center rounded-lg" onClick={borrarProducto}>Eliminar</button>
            </div>
        </div>
    )
}

export default ViewProductos;