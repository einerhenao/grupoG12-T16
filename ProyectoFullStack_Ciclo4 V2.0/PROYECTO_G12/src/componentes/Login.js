import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const Login = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });

    const {email, password} = usuario;


    const onChange = (e) => {
        setUsuario({
            ...usuario,
        [e.target.name]: e.target.value
        })
    };

    const ingresarCuenta = async () => {
        const data = {
            email: usuario.email,
            password: usuario.password
        }
        const response = await crud.POST(`/api/auth`, data);
        const mensaje = response.msg;
        console.log(mensaje);

        if (email.length === 0 || password.length === 0){
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
        }else if(mensaje === "La contraseña es incorrecta" || mensaje === "El usuario no existe"){
            const mensaje = "El usuario y/o la contraseña son incorrectos";
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

           /* const data = {
                email: usuario.email,
                password: usuario.password
            }*/
            console.log(data);

            const jwt = response.token
            //guardar la informacion en el local storage
            localStorage.setItem('token',jwt)
            //redireccionar al login 
            navigate("/admin");

            
        }
    }  

    const onSubmit = (e) => {
        e.preventDefault();
        ingresarCuenta();
    }

    return (
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
                <div className="mt-10 flex justify-center">
                    <h1 className='inline bg-gradient-to-r from-black via-red-700 to-black bg-clip-text text-center font-display text-5xl tracking-tight text-transparent font-bold font-sans'>
                        Accede a tu cuenta
                    </h1>
                </div>
                <form className="border-solid border border-black my-10 bg-white shadow rounded-lg p-10" onSubmit={onSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-black block text-lx font-bold">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"  
                            placeholder="Email de Registro" 
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
                        <input 
                            type="submit" 
                            value="Iniciar Sesión" 
                            className="my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-red-50 uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors" 
                        />
                        <Link className="font-bold font-sans block text-center my-5" to={"/crear-cuenta"}>
                            Crear Cuenta
                        </Link>
                    </div>
                </form>

            </div>
        </main>
    );
}

export default Login;