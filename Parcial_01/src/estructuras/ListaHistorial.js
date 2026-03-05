class NodoHistorial {
  constructor(registro) {
    this.registro = registro;
    this.siguiente = null;
    this.anterior = null;
  }
}

class ListaHistorial {
  constructor() {
    this.cabeza = null;
    this.cola = null;
  }

  agregar(registro) {
    const nuevo = new NodoHistorial(registro);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      this.cola = nuevo;
      return;
    }
    nuevo.anterior = this.cola;
    this.cola.siguiente = nuevo;
    this.cola = nuevo;
  }

  aArrayInvertido() {
    const resultado = [];
    let actual = this.cola;
    while (actual) {
      resultado.push(actual.registro);
      actual = actual.anterior;
    }
    return resultado;
  }

  aArray() {
    const resultado = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.registro);
      actual = actual.siguiente;
    }
    return resultado;
  }
}

export { ListaHistorial };