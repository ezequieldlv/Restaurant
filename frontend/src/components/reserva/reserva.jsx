import { useEffect, useState } from "react";
import reservaService from "../../services/reservaService";
import { setToken } from "../../services/baseService";
import pedidoService from "../../services/pedidoService";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export const Reserva = () => {  

    const [reserva, setReserva] = useState('');
    const [admin, setAdmin] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();
    
    const { id } = useParams();

    const fetchReserva = async (id) => {
        await reservaService.getReservaById(id)
            .then((data) => {
            const date = new Date(data.fechaHora);
            data.fechaHora = `${date.toUTCString([], { hour: '2-digit', minute: '2-digit' })}`;
            setReserva(data)
            })
            .catch(error => console.error('Error obteniendo reserva:', error));
    }

    const fetchPedidos = async (id) => {
        await pedidoService.getPedidosByReserva(id)
                .then((data) => {
                setPedidos(data)
                })
                .catch(error => console.error('Error obteniendo pedidos:', error));
    }

    const deleteReserva = async () => {
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
                    await reservaService.deleteReserva(id).then((res) => 
                    Swal.fire({
                        title: "Borrado!",
                        text: `${res.res}`,
                        icon: "success"
                    })).catch((error) => Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${error.error}`
                    }));
                    navigate("/home")
                }
              });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const deletePedido = async (idPedido) => {
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
                await pedidoService.deletePedido(idPedido).then((res) => 
                Swal.fire({
                    title: "Borrado!",
                    text: `${res.res}`,
                    icon: "success"
                }), window.location.reload()).catch((error) => Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.error}`
                }));
            }
          });
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token, id:idUser } = JSON.parse(loggedUser);
          if (idUser === 1) setAdmin(true);
          setToken(token);
          fetchReserva(id);
          fetchPedidos(id);
        }else{
            navigate("/login");  
        }      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[id, navigate]);

    if (!reserva) {
        return <div className="alert alert-secondary vh-100" role="alert">Loading...</div>;
    }

    return (
      <div className="container-fluid">
        <div className="card text-center m-4">
            <div className="card-header d-flex justify-content-between bg-body-secondary">
                {reserva.activa || (admin) ? (
                    <button type="submit" onClick={() => {navigate(`/reserva/update/${id}`)}} className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    </button>
                ) : ""}
                <h2 className="m-auto">RESERVA</h2>
                {reserva.activa || admin ? 
                    (<button type="submit" onClick={deleteReserva} className="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </button>)
                : ""}
            </div>
            <div  className="card-body" key={reserva.idReserva}>
                <h5 className="card-title fw-medium fs-3">MESA</h5>
                <p className="card-text">Numero: {reserva.mesa.numero}</p>
                <p className="card-text">Ubicacion: {reserva.mesa.ubicacion}</p>
                <p className="card-text">Personas: {reserva.nroPersonas}</p>
                {reserva.activa || admin ? <button onClick={() => navigate(`/pedido/create/${reserva.idReserva}`)} className="btn btn-outline-success mb-3">Crear pedido</button>
                : ""}
                <h3 className="mb-3 fw-semibold text-decoration-underline">PEDIDOS</h3>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {!pedidos.length ? <p className="m-auto pt-4 text-black-50">...</p> : ""}
                    {pedidos.map((pedido) => (
                        <div className="" key={pedido.idPedido}>
                        <div className=" card" >
                            <div className="card-header d-flex justify-content-between bg-body-secondary">
                                {reserva.activa || admin ? 
                                (<button type="submit" onClick={() => {navigate(`/pedido/update/${reserva.idReserva}/${pedido.idPedido}`)}} className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </button>)
                                : ""}
                                <h5 className="card-title fs-5 fw-bold m-auto">PEDIDO</h5>
                                {reserva.activa || admin ? 
                                (<button type="submit" onClick={() => {deletePedido(pedido.idPedido)}} className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </button>)
                                : ""}
                            </div>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-body-secondary fs-5">MENU</h6>
                                <p className="card-text">{pedido.menu.nombre}</p>
                                <p className="card-text">{pedido.menu.descripcion}</p>
                                <p className="card-text">${pedido.menu.precio}</p>
                                <p className="card-text">Cantidad: {pedido.cantidad}</p>
                                <h6>Precio total: ${pedido.precioTotal}</h6>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="card-footer text-body-secondary bg-body-secondary">
                {reserva.fechaHora}
            </div>
        </div>
      </div>
    )
  }
  