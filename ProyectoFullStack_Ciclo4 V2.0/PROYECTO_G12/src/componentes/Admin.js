import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';
import Header from "./Header";
import Sidebar from "./Sidebar";

const Admin = () => {

    const navigate = useNavigate()

    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            //console.log(token)
            if (!token) {
                navigate("/login")
            }
        }
        autenticarUsuario()
    }, []); // Se ejecujta solo unsa vez

    const cerrarSesion = () => {

        localStorage.removeItem("token");
        navigate("/");

    }
    // usestate inicializa vacio
    const [categoria, setCategoria] = useState([]);

    const cargarCategorias = async () => {

        const response = await crud.GET(`/api/categorias`);
        console.log(response);
        setCategoria(response.categoria);

    }

    useEffect(() => {
        cargarCategorias();
    }, []);

    const borrarCategoria = async (e, idCategoria) => {
        swal({
            title: "Estas seguro de eliminar esta categoria?",
            text: "Una vez eliminado no se puede recuperar esta categoria",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

            .then((willDelete) => {
                if (willDelete) {
                    e.preventDefault();
                    const response = crud.DELETE(`/api/categorias/${idCategoria}`);
                    console.log(response.msg);
                    const mensaje = response.msg;
                    if (response) {
                        swal("Tu categoria ha sido eliminada correctamente", {
                            icon: "success",
                        });
                    }
                    cargarCategorias();
                } else {
                    swal("Se cancelo la acción");
                }
            });
    }


    const actualizarCategoria = async (idCategoria) => {

        navigate(`/actualizar-categoria/${idCategoria}`);

    }

    const crearProductos = async (idCategoria) => {
        navigate(`/home-productos/${idCategoria}`);
    }

    return (
        <>

            <Header />
            <div className="md:flex md:min-h-screen">
                <div className="md:flex md:min-h-screen">
                    <Sidebar />

                </div>

                <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
                    <div className='md:w-full lg:w-4/5 text-center'>
                        <h1 className='inline bg-gradient-to-r from-black via-red-700 to-black bg-clip-text text-center font-display text-5xl tracking-tight text-transparent font-bold font-sans'>
                            Listado de Categorias
                        </h1>
                        <div className="w-full mt-10 flex justify-center">
                            <section class="mt-10 flex justify-center">
                                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div class="w-full overflow-x-auto">
                                        <table class="w-full">
                                            <thead>
                                                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                    <th class="px-4 py-3">Imagen</th>
                                                    <th class="px-4 py-3">Nombre</th>
                                                    <th class="px-4 py-3">Id</th>
                                                    <th class="px-4 py-3">Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white">
                                                {
                                                    categoria.map(
                                                        item =>
                                                            <tr key={item._id} class="text-gray-700">
                                                                <td class="px-4 py-3 border">
                                                                    <div class="flex items-center text-sm">
                                                                    <div class="relative w-full h-full mr-3 rounded-full md:block">
                                                                        <div class="relative w-full h-full  rounded-full md:block">
                                                                            <img class="object-cover w-full h-full rounded-full"  src={item.imagen} width="150" height="150"></img>
                                                                            <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-4 py-3 text-ms font-semibold border">{item.nombre}</td>
                                                                <td class="px-4 py-3 text-xs border">
                                                                    {item._id}
                                                                </td>
                                                                <td class="px-4 py-3 text-sm border"><input
                                                                    type="submit"
                                                                    value="Eliminar"
                                                                    className="my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
                                                                    onClick={(e) => borrarCategoria(e, item._id)}
                                                                />
                                                                    <input
                                                                        type="submit"
                                                                        value="Actualizar"
                                                                        className="my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
                                                                        onClick={(e) => actualizarCategoria(item._id)}
                                                                    />
                                                                    <input
                                                                        type="submit"
                                                                        value="Lista de productos"
                                                                        className="my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
                                                                        onClick={(e) => crearProductos(item._id)}
                                                                    /> </td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>



        </>
    );
}

export default Admin;