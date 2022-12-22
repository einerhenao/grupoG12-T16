import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const CrearCuenta = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    const {nombre, email, password, confirmar} = usuario;


    const onChange = (e) => {
        setUsuario({
            ...usuario,
        [e.target.name]: e.target.value
        })
    };

    const crearCuenta = async () => {
        
        if(password !== confirmar){
            console.log('diferentes');
            const mensaje = "Las contraseñas son diferentes";
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
        }else if (nombre === '' || email === '' || password === '' || confirmar === ''){
            const mensaje = "Los campos no pueden estar vacios";
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
        }
        else{

            const data = {
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password
            }
            console.log(data);
            const response = await crud.POST(`/api/usuarios`, data);
            const mensaje = response.msg;
            //console.log(mensaje);
            if(mensaje === "El usuario ya existe"){
                //const mensaje = "El usuario ya existe";
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
                    const mensaje = "El usuario fue creado correctamente";
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
                    //limpiar los campos cuando se envie el formulario
                    setUsuario({
                        nombre:'',
                        email:'',
                        password:'',
                        confirmar:''
                    })
                    //redireccionar al login 
                    navigate("/login");
            }

        }
    }  

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }

    return (
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5 text-center'>
            <h1 className='inline bg-gradient-to-r from-black via-red-700 to-black bg-clip-text font-bold font-sans font-display text-5xl tracking-tight text-transparent'>
                Registro de usuarios
            </h1>
            <form className="border-solid border border-black my-10 bg-white shadow rounded-lg p-10" onSubmit={onSubmit}>
                <div className="my-5">
                    <label className="uppercase text-black block text-lx font-bold">Nombre</label>
                    <input 
                        type="nombre"
                        id="nombre"
                        name="nombre" 
                        placeholder="Ingrese su nombre" 
                        className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                        value={nombre}
                        onChange={onChange}
                    />
                    <label className="uppercase text-black block text-lx font-bold">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email" 
                        placeholder="Ingrese su email" 
                        className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                        value={email}
                        onChange={onChange}
                    />
                    <label className="uppercase text-black block text-lx font-bold">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        placeholder="Password de Registro" 
                        className="border-solid border border-black my-5 w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                        value={password}
                        onChange={onChange}
                    />
                    <label className="uppercase text-black block text-lx font-bold">Password</label>
                    <input 
                        type="confirmar" 
                        id="confirmar"
                        name="confirmar"
                        placeholder="Confirmación de Password" 
                        className="border-solid border border-black w-full mt-3 p-3 rounded-xl bg-red-50 font-bold font-sans"
                        value={confirmar}
                        onChange={onChange}
                    />
                    <input 
                        type="submit" 
                        value="Registrar usuario" 
                        className="my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-red-50 uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors" 
                    />
                    
                    <Link className="font-bold font-sans block text-center my-5" to={"/"}>
                        Regresar
                    </Link>
                </div>
            </form>

        </div>
    </main>
    );

}

export default CrearCuenta;