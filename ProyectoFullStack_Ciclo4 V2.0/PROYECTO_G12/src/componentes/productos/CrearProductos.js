import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from '../../conexiones/crud';
import swal from 'sweetalert';

const CrearProductos = () => {

    const navigate = useNavigate();
    const {idCategoria} = useParams();

    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            //console.log(token)
            if(!token){
                navigate("/login")
            }
        }
        autenticarUsuario()
    },[]); // Se ejecujta solo unsa vez

    const [categoria, setCategoria] = useState({
        nombre:'',
        descripcion:'',
        stock:'',
        precio:'',
        imagen:'',
        categoriaId:''
    });

    const {nombre, descripcion, stock, precio, imagen} = categoria;


    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    };

    const ingresarCategoria = async () => {
        if(nombre.length===0 || imagen.length===0){
            const mensaje = "Los campos no pueden estar vacios"
            swal({
                title:'Error',
                text: mensaje,
                icon: 'error',
                buttons:{
                    confirm:{
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }else{
            const data = {
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
                stock: categoria.stock,
                precio: categoria.precio,
                imagen: categoria.imagen,
                categoriaId: idCategoria
            }

            console.log(data);
            const response = await crud.POST(`/api/productos`, data);
            const mensaje = response.msg;
            console.log(mensaje);
                    swal({
                        title:'Información',
                        text: mensaje,
                        icon: 'success',
                        buttons:{
                            confirm:{
                                text: 'OK',
                                value: true,
                                visible: true,
                                className: 'btn btn-primary',
                                closeModal: true
                            }
                        }
                    });
            navigate(`/home-productos/${idCategoria}`);

        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        ingresarCategoria();
    }

    return (
        
        <>
        <Header/>
        <div className="md:flex md:min-h-screen">
            <Sidebar/>
            <main className="flex-1">
                <div className="mt-10 flex justify-center">
                    <h1 className='inline bg-gradient-to-r from-black via-red-700 to-black bg-clip-text text-center font-display text-5xl tracking-tight text-transparent font-bold font-sans'>
                        Crear Producto
                    </h1>
                </div>
                <div className="mt-10 flex justify-center">
                <form className="border-solid border border-black my-10 bg-white shadow rounded-lg p-10" onSubmit={onSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-black block text-lx font-bold">Nombre del Producto</label>
                        <input 
                            type="nombre"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre de Categoria"
                            className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                            value={nombre}
                            onChange={onChange}
                        />
                        <label className="uppercase text-black block text-lx font-bold">Descripción Producto</label>
                        <input 
                            type="descripcion"
                            id="descripcion"
                            name="descripcion"
                            placeholder="Descripcion"
                            className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                            value={descripcion}
                            onChange={onChange}
                        />
                        <label className="uppercase text-black block text-lx font-bold">Stock Producto</label>
                        <input 
                            type="number"
                            id="stock"
                            name="stock"
                            placeholder="Stock"
                            className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                            value={stock}
                            onChange={onChange}
                        />
                        <label className="uppercase text-black block text-lx font-bold">Precio Producto</label>
                        <input 
                            type="number"
                            id="precio"
                            name="precio"
                            placeholder="Precio"
                            className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                            value={precio}
                            onChange={onChange}
                        />
                        <label className="uppercase text-black block text-lx font-bold">Imagen del Producto</label>
                        <input 
                            type="text"
                            id="imagen"
                            name="imagen"
                            placeholder="Imagen"
                            className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                            value={imagen}
                            onChange={onChange}
                        />
                        <input 
                            type="submit" 
                            value="Crear Productos" 
                            className="my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-red-50 uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors" 
                        />
                    </div>
                </form>
                </div>
            </main>
        </div>
        
        </>

    );
}

export default CrearProductos;