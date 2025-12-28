import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import doRegister from '../../services/registerService';
import Swal from 'sweetalert2';

export const Registro = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logedUser = window.localStorage.getItem("LogedUser")
    if (logedUser) {
      setUser(JSON.parse(logedUser));
      navigate("/home");
    }
  }, [user, navigate])


  const onSubmit = async (data) => {
    try {
      const newUser = {
        nombre: data.name,
        apellido: data.lastName,
        mail: data.email,
        password: data.password
      };

      const response = await doRegister(newUser);

      if (response && typeof response === 'object') {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario registrado con exito!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/login')
      } else {
        setErrorMessage('Error desconocido al registrar el usuario')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }
      } catch (error) {
      setErrorMessage('Error al crear usuario: ' + error.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)

    }
  };

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
          <h1>REGISTRARSE</h1>
          <form id="register" onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="name" id="name" name="name" className={`form-control m-2 ${errors.name ? 'is-invalid' : ''}`} placeholder="Nombre" autoComplete="name" {...register("name", { required: true })}/>
              {errors.name && <div className="invalid-feedback">Por favor, ingrese su nombre</div>}
            </div>
            <div className="m-4">
              <label htmlFor="lastName" className="form-label">Apellido</label>
              <input type="lastName" id="lastName" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} placeholder="Apellido" autoComplete="lastName" {...register("lastName", { required: true })}/>
              {errors.lastName && <div className="invalid-feedback">Por favor, ingrese su apellido</div>}
            </div>
            <div className="m-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email"  id="email" name="email" className={`form-control m-2 ${errors.email ? 'is-invalid' : ''}`} aria-describedby="emailHelp" placeholder="Correo electronico" autoComplete="email"
              {...register('email', { 
                required: 'El email es obligatorio',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'El email no es válido'
                        }
              })}/>
              {errors.email && <div className="invalid-feedback">Por favor, ingrese un correo</div>}
              <div id="emailHelp" className="form-text">No compartiremos tu email con nadie!</div>
            </div>
            <div className="m-4">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" id="password" name="password" className={`form-control m-2 ${errors.password ? 'is-invalid' : ''}`} placeholder="Contraseña" autoComplete="current-password" 
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres'
                }
              })}/>
              {errors.password && <div className="invalid-feedback">Por favor, ingrese una contraseña</div>}
            </div>
            <button type="submit" className="btn btn-primary">Registrarme</button>
          </form>
        </div>
        <div className="card-footer text-body-secondary py-3 bg-body-secondary" > 
          <Link to="/login">¡Ya tengo un usuario!</Link>
        </div>
      </div>
    </div>
  )
}
