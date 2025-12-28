/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import pedidoService from '../../services/pedidoService';
import { useEffect, useState } from 'react';
import { setToken } from '../../services/baseService';
import Swal from 'sweetalert2';

export const UpdatePedido = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [pedido, setPedido] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { idPedido, idReserva } = useParams();
    const [menuSeleccionado] = useState(location.state?.menuSeleccionado || null);


    const fetchPedido = async (id) => {
        const pedido = await pedidoService.getPedidoById(id);
        setPedido(pedido);
        setValue('cantidad', pedido.cantidad);
        //setValue('menu', pedido.idMenu);
      }

    const onSubmit = async (data) => {
      if (data.cantidad < 0) return window.alert("El valor no puede ser negativo");  
      try {
        const req = {
          idMenu: menuSeleccionado?.idMenu || pedido.idMenu,
          cantidad: data.cantidad
        };
        await pedidoService.updatePedido(idPedido, req);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Pedido actualizado con exito!",
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
          fetchPedido(idPedido);
        }else{
            navigate("/login");  
        }
        }, [idPedido, navigate]);

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
          <h1>EDITAR PEDIDO</h1> 
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-5 mb-4">
                <label htmlFor="menu" className="form-label">Menu</label>
                <input
                    id='menu'
                    type="text"
                    className={`form-control m-2 ${errors.menu ? 'is-invalid' : ''} ${menuSeleccionado ? "border border-primary" : ""}`}
                    value={menuSeleccionado ? menuSeleccionado.nombre : (pedido.menu ? pedido.menu.nombre : "")}
                    readOnly
                    {...register('menu', { required: true })}
                />
                <button onClick={() => navigate(`/menus/update/${idReserva}/${idPedido}`)} className="btn btn-outline-primary mt-2">Seleccionar menu</button>
            </div>
            <div className="m-5 mb-4">
              <label htmlFor="cantidad" className="form-label">Cantidad</label>
              <input type="number" min="0" id="cantidad" className={`form-control m-2 ${errors.cantidad ? 'is-invalid' : ''}`} placeholder="Ingrese la cantidad de menus" autoComplete="cantidad" {...register("cantidad", { required: true })}/>
            </div>
            <button type="submit" className="btn btn-success">Actualizar</button>
          </form>
        </div>
        <div className="card-footer text-body-secondary py-3 bg-body-secondary"> 
          <Link to={`/reserva/${idReserva}`} >¡No quiero actualizar el pedido!</Link>
        </div>
      </div>
    </div>
  )
}
