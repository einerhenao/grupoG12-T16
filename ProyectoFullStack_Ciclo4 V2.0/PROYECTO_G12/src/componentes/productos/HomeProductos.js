import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from '../../conexiones/crud';
import swal from 'sweetalert';
import ViewProductos from "./ViewProductos";

const HomeProductos = () => {

    const navigate = useNavigate();

    const {idCategoria} = useParams();

    const [productos, setProductos] = useState([]);

    const cargarProductos = async () => {
        const response = await crud.GET(`/api/productos/${idCategoria}`);
        setProductos(response);
    };

    console.log(productos);


    useEffect(() => {
        cargarProductos();
    },[]);

    

    return (
        
        <>
        <Header/>
        <div className="md:flex md:min-h-screen">
            <Sidebar/>
            <main className="flex-1">
                <div className="mt-10 flex justify-center">
                    <h1 className='inline bg-gradient-to-r from-black via-red-700 to-black bg-clip-text text-center font-display text-5xl tracking-tight text-transparent font-bold font-sans'>
                        Lista de productos
                    </h1>
                </div>
                <div className="p-10">
                    <Link to={`/crear-producto/${idCategoria}`} className="my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-red-50 uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors">
                        Crear Producto  
                    </Link>
                </div>
                <div className="bg-white border-solid border border-black shadow mt-10 rounded-lg">
                    {productos.map( producto =>
                        <ViewProductos
                            key={producto._id}
                            producto = {producto}
                        />
                        )};
                </div>
            </main>
        </div>
        
        </>

    );
}

export default HomeProductos;