import { useState, useEffect } from "react";
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
      <h1>Sistema de Movilidad Urbana</h1>
      <h2>Agregar Vehiculo</h2>
      <input
        placeholder="Marca"
        value={nuevoVehiculo.marca}
        onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, marca: e.target.value })}
      />
      <input
        placeholder="Modelo"
        value={nuevoVehiculo.modelo}
        onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, modelo: e.target.value })}
      />
      <input
        placeholder="Tipo"
        value={nuevoVehiculo.tipo}
        onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, tipo: e.target.value })}
      />
      <input
        placeholder="Placa"
        value={nuevoVehiculo.placa}
        onChange={e => setNuevoVehiculo({ ...nuevoVehiculo, placa: e.target.value })}
      />
      <button onClick={agregarVehiculo}>Agregar</button>

      <h2>Vehiculos Disponibles</h2>
      <input
        placeholder="Nombre del cliente para alquilar"
        value={clienteAlquiler}
        onChange={e => setClienteAlquiler(e.target.value)}
      />
      {vehiculos.map(v => (
        <div key={v.id}>
          <span>{v.marca} {v.modelo} - {v.placa} - {v.tipo}</span>
          <button onClick={() => alquilarVehiculo(v)}>Alquilar</button>
        </div>
      ))}

      <h2>Vehiculo Destacado</h2>
      {destacado
        ? <p>{destacado.marca} {destacado.modelo} - {destacado.placa}</p>
        : <p>Sin vehiculo destacado</p>
      }

      <h2>Historial de Alquileres</h2>
      {historial.map(r => (
        <div key={r.id}>
          <span>{r.marca} {r.modelo} - {r.placa} - Cliente: {r.cliente} - Fecha: {r.fecha}</span>
        </div>
      ))}

      <h2>Inversionistas</h2>
      <input
        placeholder="Nombre"
        value={nuevoInversionista.nombre}
        onChange={e => setNuevoInversionista({ ...nuevoInversionista, nombre: e.target.value })}
      />
      <input
        placeholder="Monto"
        value={nuevoInversionista.monto}
        onChange={e => setNuevoInversionista({ ...nuevoInversionista, monto: e.target.value })}
      />
      <button onClick={agregarInversionista}>Agregar</button>
      {inversionistas.map(inv => (
        <div key={inv.id}>
          <span>{inv.nombre} - ${inv.monto}</span>
          <button onClick={() => eliminarInversionista(inv.id)}>Eliminar</button>
        </div>
      ))}

    </div>
  );
}

export default App;