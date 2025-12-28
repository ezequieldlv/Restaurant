import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginService from '../../services/loginService';

export const Login = () => {
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
      const login = {
        userName: data.username,
        password: data.password 
      };

      const response = await loginService.doLogin(login);

      if (response && typeof response === 'object') {
        window.localStorage.setItem('LogedUser', JSON.stringify(response));
        setUser(response);
      } else {
        setErrorMessage('Error desconocido al iniciar sesión')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }
      } catch (error) {
      setErrorMessage('Error al iniciar sesión: ' + error.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)

    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark" style={{height: '100%'}}>
      <div className="card text-center border border-3" style={{ width: '65%'}}>
        <div className="card-header bg-secondary">
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
          </div>)
        }
        <div className="card-body ">
          <h1>INICIAR SESION</h1>
          <form id="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="m-5">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input type="email"  id="username" name="username" className={`form-control m-2 ${errors.username ? 'is-invalid' : ''}`} aria-describedby="emailHelp" placeholder="Nombre de usuario" autoComplete="username" {...register('username', { required: true })}/>
              {errors.username && <div className="invalid-feedback">Por favor, ingrese un nombre de usuario</div>}
              <div id="emailHelp" className="form-text">No compartiremos tu email con nadie!</div>
            </div>
            <div className="m-5 mb-4">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" id="password" name="password" className={`form-control m-2 ${errors.password ? 'is-invalid' : ''}`} placeholder="Contraseña" autoComplete="current-password" {...register("password", { required: true })}/>
              {errors.password && <div className="invalid-feedback">Por favor, ingrese una contraseña</div>}
            </div>
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
        </div>
        <div className="card-footer text-body-secondary py-3 bg-body-secondary d-flex justify-content-center"> 
          Si no tienes un usuario, 
          <Link to="/register">regístrate aquí</Link>
        </div>
      </div>
    </div>
  )

  
}
