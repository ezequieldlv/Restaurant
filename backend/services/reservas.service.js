import Cliente from "../models/clientes.js";
import Mesa from "../models/mesas.js";
import Reserva from "../models/reservas.js";

export async function getReservasByCliente(idCliente){
    const reservas = await Reserva.findAll({
        include: [
            {
                model: Mesa,
                as: "mesa",
                required: true
            }
        ],
        where: {idCliente: idCliente},
        order:  [['fechaHora', 'DESC']]
        //limit: 5
    }
    );
    return reservas;
};

export async function getReservas(){
    const reservas = await Reserva.findAll({
        include: [
            {
                model: Mesa,
                as: "mesa",
                required: true  
            },
            {
                model: Cliente,
                as: "cliente",
                required: true
            }
        ],
        order:  [['fechaHora', 'DESC']]
    }
    );
    return reservas;
};

export async function getReservasActivas(idCliente){
    const reservas = await Reserva.findAll({
        include: [
            {
                model: Mesa,
                as: "mesa",
                required: true
            }
        ],
        where: {idCliente: idCliente, activa: true},
        order:  [['fechaHora', 'DESC']]
    }
    );
    return reservas;
};

export async function getReservaById(id){
    const reserva = await Reserva.findByPk(id,{
        include: [
            {
                model: Cliente,
                as: "cliente",
                required: true
            },
            {
                model: Mesa,
                as: "mesa",
                required: true
            }
        ]
    });

    if (!reserva) {
        throw new Error("cannotGet");
        };
        
    return reserva;
};

export async function createReserva(data){
    const reserva = await Reserva.create(data);
    return getReservaById(reserva.idReserva);
};

export async function updateReserva(id,data){
    await getReservaById(id);
    return Reserva.update(data, { where: {idReserva: id}})
};

export async function deleteReserva(id){
    await getReservaById(id);
    return Reserva.destroy( { where: { idReserva: id }});
};

export async function verificarActivas(){
    const reservas = await Reserva.findAll();
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()));
    
    const updatePromises = reservas.map(async (reserva) => {
        //const reservaDateUTC = new Date(Date.UTC(reserva.fechaHora.getFullYear(), reserva.fechaHora.getMonth(), reserva.fechaHora.getDate()));
    
        if (reserva.fechaHora < todayUTC) {
          return Reserva.update({ activa: false }, { where: { idReserva: reserva.idReserva } });
        } 
      });
    
    await Promise.all(updatePromises);
}