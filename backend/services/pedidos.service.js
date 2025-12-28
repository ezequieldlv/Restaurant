import Menu from "../models/menus.js";
import Pedido from "../models/pedidos.js";
import Reserva from "../models/reservas.js";

export async function getPedidos(){
    const pedidos = await Pedido.findAll({
        include: [
            {
                model: Reserva,
                as: "reserva",
                required: true
            },
            {
                model: Menu,
                as: "menu",
                required: true
            }
        ]
    });
    return pedidos;
};

export async function getPedidosByReserva(idReserva){
    const pedidos = await Pedido.findAll({
        include: [
            {
                model: Reserva,
                as: "reserva",
                required: true,
                where : {idReserva: idReserva}
            },
            {
                model: Menu,
                as: "menu",
                required: true
            }
        ]

    });
    return pedidos;
};

export async function getPedidoById(id){    
    const pedido = await Pedido.findByPk(id, {
        include: [
            {
                model: Menu,
                as: "menu",
                required: true
            }
        ]
    });
    if (!pedido) {
        throw new Error("cannotGet");
        };
    return pedido;
};

export async function createPedido(data){
    const pedido = await Pedido.create(data);
    return getPedidoById(pedido.idPedido);
};

export async function updatePedido(id, data){
    await getPedidoById(id);
    return Pedido.update(data, { where: { idPedido: id } });
};

export async function deletePedido(id){
    await getPedidoById(id);
    return Pedido.destroy({ where: {idPedido: id}});
};