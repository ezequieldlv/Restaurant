/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import reservaService from '../../services/reservaService';
import { useEffect, useState } from 'react';
import { setToken } from '../../services/baseService';
import Swal from 'sweetalert2';

export const UpdateReserva = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [reserva, setReserva] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const {idReserva} = useParams();
    const [mesaSeleccionada] = useState(location.state?.mesaSeleccionada || null);

    const fetchReserva = async (id) => {
      const reserva = await reservaService.getReservaById(id);
      setReserva(reserva);
      setValue('date', reserva.fechaHora);
      setValue('personas', reserva.nroPersonas);
      setValue('mesa', reserva.numero);
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token } = JSON.parse(loggedUser);
          setToken(token);
          fetchReserva(idReserva);
        }else{
            navigate("/login");  
        }
      }, [navigate, idReserva]);

    const onSubmit = async (data) => {  
      if (data.personas < 0) return window.alert("El valor no puede ser negativo");  
        try {
          const req = {
            idMesa: mesaSeleccionada?.idMesa || reserva.idMesa,
            fechaHora: data.date,
            nroPersonas: data.personas
          }
          await reservaService.updateReserva(idReserva, req);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Reserva actualizada con exito!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(`/reserva/${idReserva}`); 
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
            <h1>ACTUALIZAR RESERVA</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-5 mb-4">
                        <label htmlFor="personas" className="form-label">Mesa</label>
                        <input
                            type="text"
                            className={`form-control m-2 ${errors.mesa ? 'is-invalid' : ''} ${mesaSeleccionada ? "border border-dark" : ""}`}
                            value={mesaSeleccionada ? mesaSeleccionada.numero : (reserva.mesa ? reserva.mesa.numero : "")}
                            readOnly
                            {...register('mesa', { required: false })}
                        />
                        <button onClick={() => navigate(`/mesas/update/${idReserva}`)} className="btn btn-outline-primary mt-3">Seleccionar mesa</button>
                    </div>
                    <div className="m-5">
                    <label htmlFor="date" className="form-label">Fecha</label>
                    <input type="date"  id="date" className={`form-control m-2 ${errors.date ? 'is-invalid' : ''}`} autoComplete="date" {...register('date', { required: false })}/>
                    </div>
                    <div className="m-5 mb-4">
                    <label htmlFor="personas" className="form-label">Cantidad de Personas</label>
                    <input type="number" id="personas" className={`form-control m-2 ${errors.personas ? 'is-invalid' : ''}`} placeholder="Ingrese la cantidad de personas" autoComplete="personas" {...register("personas", { required: false })}/>
                    </div>
                    <button type="submit" className="btn btn-success">Actualizar</button>
                </form>
            </div>
            <div className="card-footer text-body-secondary bg-body-secondary py-3"> 
                <Link to={`/reserva/${idReserva}`}>¡No quiero actualizar la reserva!</Link>
            </div>
        </div>
      </div>
  )
}
