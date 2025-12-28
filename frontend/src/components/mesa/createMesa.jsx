import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setToken } from '../../services/baseService';
import Swal from 'sweetalert2';
import mesaService from '../../services/mesaService';



export const CreateMesa = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
          location: "interior" // Valor por defecto para el select
        }
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token } = JSON.parse(loggedUser);
          setToken(token);
        }else{
            navigate("/login");  
        } 
        }, [navigate]);

    const onSubmit = async (data) => {
      if (data.capacity < 0 || data.number < 0) return window.alert("El valor no puede ser negativo");  
      try {
          const req = {
            numero: data.number,
            capacidad: data.capacity,
            ubicacion: data.location
          };
          await mesaService.createMesa(req);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Mesa creada con exito!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/mesas/admin/none");
        } catch (error) {
            if (error.response) {
              if (error.response.status === 404) {
                setErrorMessage(error.response.data.res);
              } else if (error.response.status === 409) {
                setErrorMessage(error.response.data.res);
              } else {
                setErrorMessage("Error al crear la mesa");
              }
            } else {
              setErrorMessage("Error de red al intentar crear la mesa");
            }
            console.error("Error al crear la mesa:", error);
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
            <div className="card-body">
            <h1 className='mb-3'>CREAR MESA</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='m-2'>
                        <label htmlFor="number" className="form-label">Numero</label>
                        <input type="number" min="0" id="number" className={`form-control m-2 ${errors.number ? 'is-invalid' : ''}`} placeholder="Ingrese el numero de la mesa" autoComplete="number" {...register('number', { required: true })}/>
                        {errors.number && <div className="invalid-feedback">Por favor, ingrese el numero de la mesa</div>}
                    </div>
                    <div className='m-2'>
                        <label htmlFor="capacity" className="form-label">Capacidad</label>
                        <input type="number" min="0" id="capacity" className={`form-control m-2 ${errors.capacity ? 'is-invalid' : ''}`} placeholder="Ingrese la capacidad de la mesa" autoComplete="capacity" {...register('capacity', { required: true })}/>
                        {errors.capacity && <div className="invalid-feedback">Por favor, ingrese la capacidad de la mesa</div>}
                    </div>
                    <div className="m-2">
                      <label htmlFor="location" className="form-label">Ubicacion</label>
                      <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                          <select {...field} className="form-select">
                            <option value="interior">Interior</option>
                            <option value="exterior">Exterior</option>
                          </select>
                        )}
                      />
                    </div>
                    <button type="submit" className="btn btn-success mt-2">Crear</button>
                </form>
            </div>
            <div className="card-footer text-body-secondary bg-body-secondary py-3"> 
                <Link to="/mesas/admin/none">¡No quiero crear una mesa!</Link>
            </div>
        </div>
      </div>
  )
}
