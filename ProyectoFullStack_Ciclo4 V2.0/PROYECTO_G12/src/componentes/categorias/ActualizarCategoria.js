import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from '../../conexiones/crud';
import swal from 'sweetalert';

const ActualizarCategoria = () => {

    const navigate = useNavigate();

    const {idCategoria} = useParams();

    const [categoria, setCategoria] = useState({
        nombre:'',
        imagen:''
    })

    const cargarCategoria = async () =>{
        const response = await crud.GET(`/api/categorias/${idCategoria}`);
        console.log(response);
        setCategoria(response.categoria);
    }
    useEffect(() => {
        cargarCategoria();
    },[]);

   // console.log(categoria);
   
   const {nombre, imagen} = categoria;

   const onChange = (e) => {
        setCategoria({
            ...categoria,
                [e.target.name]:e.target.value
        })
   };

   const actualizarCategoria = async () => {
        const data = {
            nombre: categoria.nombre,
            imagen: categoria.imagen
        }
        const response = await crud.PUT(`/api/categorias/${idCategoria}`, data);
        const mensaje = "La categoria se actualizo correctamente";
        swal({
            title:'Información',
            text: mensaje,
            icon:'success',
            buttons:{
                confirm:{
                    text:'OK',
                    value:true,
                    visible:true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        });
        navigate("/admin");

   }
   
   const onSubmit = (e) => {
    e.preventDefault();
    actualizarCategoria();
   }
    return (
        
        <>
        <Header/>
        <div className="md:flex md:min-h-screen">
            <Sidebar/>
            <main className="flex-1">
                
                <div className="mt-10 flex justify-center">
                    <h1 className='inline bg-gradient-to-r from-black via-red-700 to-black bg-clip-text text-center font-display text-5xl tracking-tight text-transparent font-bold font-sans'>
                        Actualizar Categoria
                    </h1>
                </div>
                <div className="mt-10 flex justify-center">
                <form className="border-solid border border-black my-10 bg-white shadow rounded-lg p-10" onSubmit={onSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-black block text-lx font-bold">Nombre de la Categoria</label>
                        <input 
                            type="nombre"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre de Categoria"
                            className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                            value={nombre}
                            onChange={onChange}
                        />
                        <label className="uppercase text-black block text-lx font-bold">Imagen de la Categoria</label>
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
                            value="Actualizar" 
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

export default ActualizarCategoria;