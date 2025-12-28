import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteService from '../../services/clienteService';
import Swal from 'sweetalert2';

export const Footer = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const userFromStorage = localStorage.getItem('LogedUser');
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    const deleteCliente = async () => {
        Swal.fire({
            title: "Estas seguro?",
            text: "No podras revertirlo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borralo!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                await clienteService.deleteCliente(user.id).then((res) => 
                Swal.fire({
                    title: "Borrado!",
                    text: `${res.res}`,
                    icon: "success"
                })).catch((error) => Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.error}`
                }));
                navigate("/login")
            }
          });
}

  return (
    <footer className="footer bg-black">
        <div className="container p-5">
            <div className="row">
                <div className="col-md-4">
                    <p className="text-light">Mi cuenta</p>
                    <ul className="list-inline">
                        <li><a className='text-primary' onClick={() => {navigate("/usuario/update")}}>Actualizar mis datos</a></li>
                        <button onClick={deleteCliente} className="btn btn-danger mt-3">Eliminar usuario</button>
                    </ul>
                </div>
                <div className="col-md-4">
                    <p className="text-light">Acerca de nosotros</p>
                    <ul className="list-inline">
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <p className="text-light text-right">&copy; 2024 Mi sitio web</p>
                </div>
            </div>
        </div>
    </footer>
  )
}