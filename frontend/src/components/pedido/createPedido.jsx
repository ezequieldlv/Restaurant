import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import pedidoService from '../../services/pedidoService';
import { useEffect, useState } from 'react';
import { setToken } from '../../services/baseService';
import Swal from 'sweetalert2';

export const CreatePedido = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { idReserva } = useParams();
    const  menuSeleccionado  = location.state?.menuSeleccionado;


    const onSubmit = async (data) => {
      if (data.cantidad < 0) return window.alert("El valor no puede ser negativo");  
      try {
        const req = {
          idReserva: idReserva,
          idMenu: menuSeleccionado.idMenu,
          cantidad: data.cantidad
        };
        await pedidoService.createPedido(req);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pedido creado con exito!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(`/reserva/${idReserva}`); 
        } catch (error) {
          if (error.response) {
            if (error.response.status === 404) {
              setErrorMessage(error.response.data.error);
            } else if (error.response.status === 409) {
              setErrorMessage(error.response.data.res);
            } else {
              setErrorMessage("Error al crear el pedido");
            }
          } else {
            setErrorMessage("Error de red al intentar crear el pedido");
          }
          console.error("Error al crear el pedido:", error);
        }
      };

      useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token } = JSON.parse(loggedUser);
          setToken(token);
        }else{
            navigate("/login");  
        }
        }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark" style={{height: '100%'}}>
      <div className="card text-center border border-3" style={{width: '70%'}}>
          <div className="card-header bg-secondary" >
            <div className='mx-5'>
              <img src="/src/assets/react.svg" alt="Logo" width="50" className="img-fluid"/>
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
        <div className="card-body">
          <h1>CREAR PEDIDO</h1> 
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-5 mb-4">
                <label htmlFor="menu" className="form-label">Menu</label>
                <input
                    id='menu'
                    type="text"
                    className={`form-control m-2 ${errors.menu ? 'is-invalid' : ''} ${menuSeleccionado ? "border border-primary" : ""}`}
                    value={menuSeleccionado ? menuSeleccionado.nombre : ''}
                    readOnly
                    placeholder='Seleccione un menu'
                    {...register('menu', { required: true })}
                />
                {errors.menu && <div className="invalid-feedback">Por favor, seleccione un menu</div>}
                <button onClick={() => navigate(`/menus/create/${idReserva}/none`)} className="btn btn-primary">Seleccionar menu</button>
            </div>
            <div className="m-5 mb-4">
              <label htmlFor="cantidad" className="form-label">Cantidad</label>
              <input type="number" min="0" id="cantidad" className={`form-control m-2 ${errors.cantidad ? 'is-invalid' : ''}`} placeholder="Ingrese la cantidad de menus" autoComplete="cantidad" {...register("cantidad", { required: true })}/>
              {errors.cantidad && <div className="invalid-feedback">Por favor, ingrese la cantidad de Menus</div>}
            </div>
            <button type="submit" className="btn btn-outline-success">Crear</button>
          </form>
        </div>
        <div className="card-footer text-body-secondary py-3 bg-body-secondary"> 
          <Link to={`/reserva/${idReserva}`} >¡No quiero hacer un pedido!</Link>
        </div>
      </div>
    </div>
  )
}
