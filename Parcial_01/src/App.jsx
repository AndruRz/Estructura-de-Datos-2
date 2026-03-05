import { useState, useEffect } from "react";
import "./App.css";
import { ListaVehiculos } from "./estructuras/ListaVehiculos";
import { ListaCircular } from "./estructuras/ListaCircular";
import { ListaInversionistas } from "./estructuras/ListaInversionistas";
import { ListaHistorial } from "./estructuras/ListaHistorial";

const listaVehiculos = new ListaVehiculos();
const listaHistorial = new ListaHistorial();
const listaDestacados = new ListaCircular();
const listaInversionistas = new ListaInversionistas();

function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [destacado, setDestacado] = useState(null);
  const [inversionistas, setInversionistas] = useState([]);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({ marca: "", modelo: "", tipo: "", placa: "" });
  const [nuevoInversionista, setNuevoInversionista] = useState({ nombre: "", monto: "" });
  const [clienteAlquiler, setClienteAlquiler] = useState("");

  const actualizar = () => {
    setVehiculos(listaVehiculos.aArray());
    setHistorial(listaHistorial.aArrayInvertido());
    setDestacado(listaDestacados.obtenerActual());
    setInversionistas(listaInversionistas.aArray());
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      listaDestacados.rotar();
      setDestacado(listaDestacados.obtenerActual());
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const agregarVehiculo = () => {
    if (!nuevoVehiculo.marca || !nuevoVehiculo.modelo) return;
    const vehiculo = {
      id: Date.now(),
      marca: nuevoVehiculo.marca,
      modelo: nuevoVehiculo.modelo,
      tipo: nuevoVehiculo.tipo,
      placa: nuevoVehiculo.placa
    };
    listaVehiculos.agregar(vehiculo);
    listaDestacados.agregar(vehiculo);
    setNuevoVehiculo({ marca: "", modelo: "", tipo: "", placa: "" });
    actualizar();
  };

  const alquilarVehiculo = (vehiculo) => {
    if (!clienteAlquiler) return;
    const registro = {
      id: Date.now(),
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      placa: vehiculo.placa,
      cliente: clienteAlquiler,
      fecha: new Date().toLocaleDateString()
    };
    listaVehiculos.eliminar(vehiculo.id);
    listaHistorial.agregar(registro);
    setClienteAlquiler("");
    actualizar();
  };

  const agregarInversionista = () => {
    if (!nuevoInversionista.nombre || !nuevoInversionista.monto) return;
    const inversionista = {
      id: Date.now(),
      nombre: nuevoInversionista.nombre,
      monto: nuevoInversionista.monto
    };
    listaInversionistas.agregar(inversionista);
    setNuevoInversionista({ nombre: "", monto: "" });
    actualizar();
  };

  const eliminarInversionista = (id) => {
    listaInversionistas.eliminar(id);
    actualizar();
  };

  return (
    <div>
      <h1>Sistema de Movilidad Urbana - Hecho por André Rodriguez Pérez</h1>

      <div className="contenedor">
        <div className="seccion-destacado">
          <h2>Vehiculo Destacado</h2>
          {destacado
            ? <>
                <p className="destacado-nombre">{destacado.marca} {destacado.modelo}</p>
                <p className="destacado-placa">{destacado.placa} — {destacado.tipo}</p>
              </>
            : <p className="vacio">Sin vehiculo destacado</p>
          }
        </div>

        <div className="seccion">
          <h2>Agregar Vehiculo</h2>
          <div className="formulario">
            <input placeholder="Marca" value={nuevoVehiculo.marca} onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, marca: e.target.value })} />
            <input placeholder="Modelo" value={nuevoVehiculo.modelo} onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, modelo: e.target.value })} />
            <input placeholder="Tipo" value={nuevoVehiculo.tipo} onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, tipo: e.target.value })} />
            <input placeholder="Placa" value={nuevoVehiculo.placa} onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, placa: e.target.value })} />
            <button onClick={agregarVehiculo}>Agregar</button>
          </div>
        </div>

        <div className="seccion">
          <h2>Vehiculos Disponibles</h2>
          <div className="formulario">
            <input placeholder="Nombre del cliente" value={clienteAlquiler} onChange={e => setClienteAlquiler(e.target.value)} />
          </div>
          <div className="lista-items">
            {vehiculos.length === 0
              ? <p className="vacio">No hay vehiculos disponibles</p>
              : vehiculos.map(v => (
                  <div className="item" key={v.id}>
                    <span>{v.marca} {v.modelo} — {v.placa}</span>
                    <button onClick={() => alquilarVehiculo(v)}>Alquilar</button>
                  </div>
                ))
            }
          </div>
        </div>

        <div className="seccion">
          <h2>Historial de Alquileres</h2>
          {historial.length === 0
            ? <p className="vacio">Sin alquileres registrados</p>
            : historial.map(r => (
                <div className="historial-item" key={r.id}>
                  <p className="historial-cliente">{r.cliente}</p>
                  <p>{r.marca} {r.modelo} — {r.placa}</p>
                  <p className="historial-fecha">{r.fecha}</p>
                </div>
              ))
          }
        </div>

        <div className="seccion">
          <h2>Inversionistas</h2>
          <div className="formulario">
            <input placeholder="Nombre" value={nuevoInversionista.nombre} onChange={e => setNuevoInversionista({ ...nuevoInversionista, nombre: e.target.value })} />
            <input placeholder="Monto" value={nuevoInversionista.monto} onChange={e => setNuevoInversionista({ ...nuevoInversionista, monto: e.target.value })} />
            <button onClick={agregarInversionista}>Agregar</button>
          </div>
          <div className="lista-items">
            {inversionistas.length === 0
              ? <p className="vacio">Sin inversionistas registrados</p>
              : inversionistas.map(inv => (
                  <div className="item" key={inv.id}>
                    <span>{inv.nombre} — ${inv.monto}</span>
                    <button onClick={() => eliminarInversionista(inv.id)}>Eliminar</button>
                  </div>
                ))
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;