import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setToken } from '../../services/baseService';
import Swal from 'sweetalert2';
import menuService from '../../services/menuService';



export const CreateMenu = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const categoriaSeleccionada = location.state?.categoriaSeleccionada;

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
      if (data.price < 0) return window.alert("El valor no puede ser negativo");  
        try {
          const req = {
            idCategoria: categoriaSeleccionada.idCategoria,
            nombre: data.name,
            descripcion: data.description,
            precio: data.price
          };
          await menuService.createMenu(req);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Menu creado con exito!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/menus/admin/none/none");
        } catch (error) {
            if (error.response) {
              if (error.response.status === 404) {
                setErrorMessage(error.response.data.res);
              } else if (error.response.status === 409) {
                setErrorMessage(error.response.data.res);
              } else {
                setErrorMessage("Error al crear el menu");
              }
            } else {
              setErrorMessage("Error de red al intentar crear el menu");
            }
            console.error("Error al crear el menu:", error);
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
            <h1 className='mb-3'>CREAR MENU</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-2">
                        <label htmlFor="personas" className="form-label">Categoria</label>
                        <input
                            type="text"
                            className={`form-control m-2 ${errors.category ? 'is-invalid' : ''} ${categoriaSeleccionada ? "border border-primary" : ""}`}
                            value={categoriaSeleccionada ? categoriaSeleccionada.nombre : ''}
                            readOnly
                            placeholder="Ingrese la categoria"
                            {...register('category', { required: true })}
                        />
                        {errors.category && <div className="invalid-feedback">Por favor, seleccione una categoria</div>}
                        <button onClick={() => navigate("/categorias/create/none")} className="btn btn-outline-primary my-2">Seleccionar categoria</button>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text"  id="name" name="name" className={`form-control m-2 ${errors.name ? 'is-invalid' : ''}`} placeholder="Ingrese el nombre" autoComplete="name" {...register('name', { required: true })}/>
                        {errors.name && <div className="invalid-feedback">Por favor, ingrese un nombre</div>}
                    </div>
                    <div className='m-2'>
                        <label htmlFor="description" className="form-label">Descripcion</label>
                        <input type="text"  id="description" className={`form-control m-2 ${errors.description ? 'is-invalid' : ''}`} placeholder="Ingrese la descripcion" autoComplete="description" {...register('description', { required: true })}/>
                        {errors.description && <div className="invalid-feedback">Por favor, ingrese una descripcion</div>}
                    </div>
                    <div className="m-2">
                        <label htmlFor="price" className="form-label">Precio</label>
                        <input type="number" id="price" step="0.01" inputMode="decimal" min="0" max="100" className={`form-control m-2 ${errors.price ? 'is-invalid' : ''}`} placeholder="Ingrese el precio" autoComplete="price" {...register("price", { required: true })}/>
                        {errors.price && <div className="invalid-feedback">Por favor, ingrese el precio</div>}
                    </div>
                    <button type="submit" className="btn btn-success mt-2">Crear</button>
                </form>
            </div>
            <div className="card-footer text-body-secondary bg-body-secondary py-3"> 
                <Link to="/menus/admin/none/none">¡No quiero crear un menu!</Link>
            </div>
        </div>
      </div>
  )
}
