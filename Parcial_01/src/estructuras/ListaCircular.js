class NodoCircular {
  constructor(vehiculo) {
    this.vehiculo = vehiculo;
    this.siguiente = null;
  }
}

class ListaCircular {
  constructor() {
    this.cabeza = null;
    this.actual = null;
    this.tamanio = 0;
  }

  agregar(vehiculo) {
    const nuevo = new NodoCircular(vehiculo);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      nuevo.siguiente = this.cabeza;
      this.actual = this.cabeza;
      this.tamanio++;
      return;
    }
    let ultimo = this.cabeza;
    while (ultimo.siguiente !== this.cabeza) {
      ultimo = ultimo.siguiente;
    }
    ultimo.siguiente = nuevo;
    nuevo.siguiente = this.cabeza;
    this.tamanio++;
  }

  rotar() {
    if (this.actual) {
      this.actual = this.actual.siguiente;
    }
  }

  obtenerActual() {
    return this.actual ? this.actual.vehiculo : null;
  }

  aArray() {
    if (!this.cabeza) return [];
    const resultado = [];
    let nodo = this.cabeza;
    do {
      resultado.push(nodo.vehiculo);
      nodo = nodo.siguiente;
    } while (nodo !== this.cabeza);
    return resultado;
  }
}

export { ListaCircular };