import './App.css';
import { Login } from './components/login/login.jsx';
import { Home } from './components/home/home.jsx';
import { Navbar } from './components/navbar/navbar.jsx';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Reserva } from './components/reserva/reserva.jsx';
import { CreateReserva } from './components/reserva/createReserva.jsx';
import { CreatePedido } from './components/pedido/createPedido.jsx';
import { Registro } from './components/registro/registro.jsx';
import { Mesa } from './components/mesa/mesa.jsx';
import { Menu } from './components/menu/menu.jsx';
import { UpdateReserva } from './components/reserva/updateReserva.jsx';
import { UpdatePedido } from './components/pedido/updatePedido.jsx';
import NotFound from './components/notFound/notFound.jsx';
import { Footer } from './components/footer/footer.jsx';
import { UpdateCliente } from './components/cliente/updateCliente.jsx';
import { CreateMenu } from './components/menu/createMenu.jsx';
import { Categoria } from './components/categoria/categoria.jsx';
import { UpdateMenu } from './components/menu/updateMenu.jsx';
import { CreateMesa } from './components/mesa/createMesa.jsx';
import { UpdateMesa } from './components/mesa/updateMesa.jsx';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route element={<LayoutWithNavbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reserva/:id" element={<Reserva />} />
            <Route path="/mesas/:mode/:idReserva" element={<Mesa />} />
            <Route path="/menus/:mode/:idReserva/:idPedido" element={<Menu />} />
            <Route path="/categorias/:mode/:idMenu" element={<Categoria />} />
          </Route>

          <Route path="/reserva/create" element={<CreateReserva />} />
          <Route path="/reserva/update/:idReserva" element={<UpdateReserva />} />
          <Route path="/pedido/create/:idReserva" element={<CreatePedido />} />
          <Route path="/pedido/update/:idReserva/:idPedido" element={<UpdatePedido />} />
          <Route path="/usuario/update" element={<UpdateCliente />} />
          <Route path="/menu/create" element={<CreateMenu />} />
          <Route path="/menu/update/:idMenu" element={<UpdateMenu />} />
          <Route path="/mesa/create" element={<CreateMesa />} />
          <Route path="/mesa/update/:idMesa" element={<UpdateMesa />} />
          
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
  )
}

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
