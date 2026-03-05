class NodoVehiculo {
  constructor(vehiculo) {
    this.vehiculo = vehiculo;
    this.siguiente = null;
  }
}

class ListaVehiculos {
  constructor() {
    this.cabeza = null;
  }

  agregar(vehiculo) {
    const nuevo = new NodoVehiculo(vehiculo);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      return;
    }
    let actual = this.cabeza;
    while (actual.siguiente) {
      actual = actual.siguiente;
    }
    actual.siguiente = nuevo;
  }

  eliminar(id) {
    if (!this.cabeza) return;
    if (this.cabeza.vehiculo.id === id) {
      this.cabeza = this.cabeza.siguiente;
      return;
    }
    let actual = this.cabeza;
    while (actual.siguiente) {
      if (actual.siguiente.vehiculo.id === id) {
        actual.siguiente = actual.siguiente.siguiente;
        return;
      }
      actual = actual.siguiente;
    }
  }

  aArray() {
    const resultado = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.vehiculo);
      actual = actual.siguiente;
    }
    return resultado;
  }
}

export { ListaVehiculos };