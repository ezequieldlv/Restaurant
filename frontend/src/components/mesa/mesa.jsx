import { useNavigate, useParams } from "react-router-dom"
import { setToken } from "../../services/baseService";
import { useEffect, useState } from "react";
import mesaService from "../../services/mesaService";
import Swal from "sweetalert2";

export const Mesa = () => {

    const [mesas, setMesas] = useState([]);

    const navigate = useNavigate();

    const {mode, idReserva} = useParams();

    const handleMesa = (mesa) => {
        if(mode === "create") {
            navigate("/reserva/create", { state: { mesaSeleccionada: mesa} })
        } else if (mode === "update"){
            navigate(`/reserva/update/${idReserva}`, { state: { mesaSeleccionada: mesa} })
        }
    }

    const fetchMesa = async () => {
        await mesaService.getMesas()
                .then((data) => {
                setMesas(data)
                })
                .catch(error => console.error(error.error));
    }

    const deleteMesa = async (id) => {
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
                await mesaService.deleteMesa(id).then((res) => 
                Swal.fire({
                    title: "Borrado!",
                    text: `${res.res}`,
                    icon: "success"
                })).catch((error) => Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.error}`
                }));
                navigate("/mesas/admin/none")
            }
          });
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
            const { token } = JSON.parse(loggedUser);
            setToken(token);
            fetchMesa();
        }else{
            navigate("/login");  
        }
      }, [navigate]);

    if (!mesas.length) {
        return <div className="alert alert-secondary m-auto vh-100" role="alert">No se pudieron obtener las mesas...</div>;
    }

    return (
      <div className="container-fluid vh-100">
        <div className="card text-center m-4">
            <div className="card-header d-flex justify-content-around">
                <ul className="nav nav-tabs card-header-tabs w-70">
                <li className="nav-item">
                    <a className="nav-link active fw-bold" aria-current="true" href="#">DISPONIBLES</a>
                </li>
                </ul>
                {(mode === "admin") ? (
                        <div>
                            <button onClick={() => navigate(`/mesa/create`)} className="btn btn-outline-success">Crear mesa</button>
                        </div> )
                    : ""}
            </div>
            <div className="card-body row row-cols-1 row-cols-md-4 g-4 container-fluid">
                {mesas.map((mesa) => (
                    <div className="" key={mesa.idMesa}>
                        <div className="card text-center">
                            <div className="card-header d-flex justify-content-between bg-body-secondary">
                                {(mode === "admin") ? (
                                    <button type="submit" onClick={() => {navigate(`/mesa/update/${mesa.idMesa}`)}} className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                    </button>)
                                : ""}
                                <h4 className="m-auto fw-bold">MESA</h4>
                                {(mode === "admin") ? 
                                    <button type="submit" onClick={() => {deleteMesa(mesa.idMesa)}} className="btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                        </svg>
                                    </button>
                                : ""}
                            </div>
                            <div className="card-body">
                                <p className="card-text fw-bold"> {mesa.numero}</p>
                                <p className="card-text">Capacidad: {mesa.capacidad}</p>
                                <p className="card-text">Ubicacion: {mesa.ubicacion}</p>
                                {(mode === "update" || mode === "create") ? 
                                        <button onClick={() => handleMesa(mesa)} className="btn btn-outline-success">Seleccionar mesa</button>
                                    : ""
                                } 
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    )
  }