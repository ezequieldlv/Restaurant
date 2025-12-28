import Menu from "./menus.js";
import Categoria from "./categorias.js";
import Mesa from "./mesas.js";
import Cliente from "./clientes.js";
import Reserva from "./reservas.js";
import Pedido from "./pedidos.js";

Categoria.hasMany(Menu, { foreignKey: "idCategoria", as: "menus"});
Menu.belongsTo(Categoria, { foreignKey: "idCategoria", as: "categoria" });

Menu.hasMany(Pedido, { foreignKey: "idMenu", as: "pedidos" }); 
Pedido.belongsTo(Menu, {foreignKey: "idMenu", as: "menu"});

Reserva.hasMany(Pedido, { foreignKey: "idReserva", as: "pedidos" });
Pedido.belongsTo(Reserva, { foreignKey: "idReserva", as: "reserva"});

/*
Pedido.belongsToMany(Menu, { through: PedidoMenu, foreignKey: 'idPedido' });
Menu.belongsToMany(Pedido, { through: PedidoMenu, foreignKey: 'idMenu' });
*/

Mesa.hasMany(Reserva, { foreignKey: "idMesa", as: "reservas" });
Reserva.belongsTo(Mesa, { foreignKey: "idMesa", as: "mesa"});

Cliente.hasMany(Reserva, { foreignKey: "idCliente", as: "reservas" });
Reserva.belongsTo(Cliente, { foreignKey: "idCliente", as: "cliente"});

export {Menu, Categoria, Mesa, Cliente, Reserva ,Pedido};