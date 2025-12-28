import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteService from '../../services/clienteService';
import { setToken } from '../../services/baseService';

export const UpdateCliente = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();

  const fetchCliente = async (id) => {
    const cliente = await clienteService.getClienteById(id);
    setUser(cliente);
    setValue('name', cliente.nombre);
    setValue('lastName', cliente.apellido);
    setValue('email', cliente.mail);
    }

  useEffect(() => {
    const usuario = window.localStorage.getItem("LogedUser");
    if (usuario) {
      setLoggedUser(JSON.parse(usuario));
      const { token, id } = JSON.parse(usuario);
      setToken(token);
      fetchCliente(id);
      console.log(loggedUser)
    }else{
        navigate("/login");  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);



const onSubmit = async (data) => {
    try {
      const req = {
        nombre: data.name,
        apellido: data.lastName,
        mail: data.email,
        password: data.password
      }
      if (!data.password) delete req.password;
      await clienteService.updateCliente(user.idCliente, req);
      loggedUser.nombre = `${req.nombre} ${req.apellido}`;
      loggedUser.userName = req.mail;
      window.localStorage.setItem('LogedUser', JSON.stringify(loggedUser));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente actualizado con exito!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate(`/home`); 
    } catch (error) {
        if (error.response) {
            setErrorMessage(error.response.data.res);
        } else {
            setErrorMessage("Error al actualizar la reserva");
        }
        console.error("Error al actualizar reserva:", error.error);
      }
}

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark" style={{height: '100%'}}>
      <div className="card text-center border border-3" style={{width: '70%'}}>
        <div className="card-header bg-secondary" >
          <div className='mx-5'>
            <img src="../src/assets/react.svg" alt="Logo" width="50" className="img-fluid"/>
          </div>
          <div className='px-5'>
              <h3>RESTAURANT</h3>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
          )}
        <div className="card-body" >
          <h1>ACTUALIZAR USUARIO</h1>
          <form id="register" onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="name" id="name" name="name" className={`form-control m-2 ${errors.name ? 'is-invalid' : ''}`} placeholder="Nombre" autoComplete="name" {...register("name", { required: false })}/>
            </div>
            <div className="m-4">
              <label htmlFor="lastName" className="form-label">Apellido</label>
              <input type="lastName" id="lastName" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Apellido" autoComplete="lastName" {...register("lastName", { required: false })}/>
            </div>
            <div className="m-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email"  id="email" name="email" className={`form-control m-2 ${errors.email ? 'is-invalid' : ''}`} aria-describedby="emailHelp" placeholder="Correo electronico" autoComplete="email" {...register('email', { required: false, pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'El email no es válido'
                        }
              })}/>
            </div>
            <div className="m-4">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" id="password" name="password" className={`form-control m-2 ${errors.password ? 'is-invalid' : ''}`} placeholder="Contraseña" autoComplete="current-password" {...register("password", { required: false })}/>
            </div>
            <button type="submit" className="btn btn-primary">Actualizar</button>
          </form>
        </div>
        <div className="card-footer text-body-secondary py-3 bg-body-secondary" > 
          <Link to="/home">¡No quiero actualizar mi usuario!</Link>
        </div>
      </div>
    </div>
  )
}
