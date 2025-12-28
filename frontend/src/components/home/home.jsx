import { useNavigate } from "react-router-dom"
import { setToken } from "../../services/baseService";
import reservaService from "../../services/reservaService";
import { useEffect, useState } from "react";

export const Home = () => {

    const [reservas, setReservas] = useState([]);
    const [activas, setActivas] = useState(true);
    const [admin, setAdmin] = useState(false);

    const navigate = useNavigate();

    const fetchReservas = async (active) => {
        if (active) {
            await reservaService.getReservasActivas().then((data) => setReservas(data))
                .catch(error => console.error(error));
        } else {
            await reservaService.getReservas().then((data) => setReservas(data))
            .catch(error => console.error(error));
        }
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser");
        if (loggedUser) {
            const { token, id } = JSON.parse(loggedUser);
            if (id === 1) setAdmin(true);
            setToken(token);
            fetchReservas(activas);
        }else{
            navigate("/login");  
        }   
      },[navigate, activas]);

    return (
        <div className="container-fluid">
            <div className="card text-center m-4">
                <div className="card-header d-flex justify-content-around pt-3">
                    {admin ? <>
                                <button onClick={() => navigate("/menus/admin/none/none")} className="btn btn-outline-primary">Gestionar menus</button>
                                <button onClick={() => navigate("/mesas/admin/none")} className="btn btn-outline-primary">Gestionar mesas</button>
                            </>
                    : ""}
                    <ul className="nav nav-tabs card-header-tabs">
                        {!admin ? 
                        <>
                            <li className="nav-item">
                                <a className={`nav-link ${activas ? "active" : ""}`} onClick={() => {setActivas(true)}} aria-current="true" href="#">Activas</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activas ? "" : "active"}`} onClick={() => {setActivas(false)}} aria-disabled="true">Historial</a>
                            </li>
                        </>
                        :   <li className="nav-item">
                                <a className={`nav-link active fw-medium`} aria-disabled="true">RESERVAS</a>
                            </li>
                        }
                    </ul>
                    <button onClick={() => navigate("/reserva/create")} className="btn btn-outline-success">Crear reserva</button>
                    
                </div>
                <div className="card-body row row-cols-1 row-cols-md-4 g-4 " >
                    {!reservas.length ? (activas ? <h2 className="m-auto pt-4 text-black-50">No tienes reservas activas</h2> : <h2 className="m-auto pt-4 text-black-50">Aun no tienes reservas</h2>) : ""}
                    {reservas.map((reserva) => {
                        const date = new Date(reserva.fechaHora);
                        const formattedDateTime = `${date.toUTCString([], { hour: '2-digit', minute: '2-digit' })}`;

                        return (
                        <div className=" " key={reserva.idReserva}>
                            <div className="card text-center">
                                <div className="card-header bg-body-secondary">
                                    <h5>RESERVA</h5>
                                </div>
                                <div className="card-body">
                                    {admin ? 
                                    <>
                                        <p className="card-text">ID: {reserva.cliente.idCliente}</p>
                                        <p className="card-text">{`${reserva.cliente.nombre} ${reserva.cliente.apellido}`}</p>
                                        <p className="card-text">{reserva.cliente.mail}</p>
                                    </> 
                                    : ""}
                                    <h5 className="card-title">MESA</h5>
                                    <p className="card-text">Numero: {reserva.mesa.numero}</p>
                                    <p className="card-text">Personas: {reserva.nroPersonas}</p>
                                    <p className="card-text">Ubicacion: {reserva.mesa.ubicacion}</p>
                                    <button onClick={() => navigate(`/reserva/${reserva.idReserva}`)} className="btn btn-outline-primary">Ver reserva</button>
                                </div>
                                <div className="card-footer text-body-secondary bg-body-secondary">
                                    {formattedDateTime}
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        </div>
    )
  }
  