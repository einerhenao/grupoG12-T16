import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
const Header = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {

            localStorage.removeItem("token");
            navigate("/");      

    }

    return (
        <header className="px-4 py-5 bg-red-100 border-solid border border-black">
            <div className="md:flex md:justify-center">
                <h2 className="inline bg-gradient-to-r from-black via-red-700 to-black bg-clip-text text-center font-display text-5xl tracking-tight text-transparent font-bold font-sans">
                    Panel administrador
                </h2>
            </div>
            <br/>
            <nav class="border-solid border border-black navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
    <div class="px-6 w-full flex flex-wrap items-center justify-between">
      <div class="flex items-center">
        <button
          class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContentY"
          aria-controls="navbarSupportedContentY"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            class="w-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
      </div>
      
        <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
          <li class="nav-item">
            <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Pricing</a>
          </li>
          <li class="nav-item mb-2 lg:mb-0">
            <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">About</a>
          </li>
        </ul>
        <div className="flex flex-col md:flex-row items-center gap-4">
                    <input 
                        type="submit" 
                        value="Cerrar Sesión" 
                        className="px-8 my-5 bg-gradient-to-r from-black via-red-700 to-black mb-5 w-full py-3 text-red-50 uppercase font-bold font-sans rounded hover:cursor-pointer hover:bg-violet-300 transition-colors" 
                        onClick={cerrarSesion}
                    />
                </div>
      </div>
     
  </nav>
        </header>

    );
}

export default Header;