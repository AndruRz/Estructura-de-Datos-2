class Nodo {
  constructor(producto) {
    this.producto = producto
    this.siguiente = null
    this.anterior = null
  }
}

class ListaCircular {
  constructor() {
    this.cabeza = null
    this.tamanio = 0
  }

  agregar(producto) {
    const nuevoNodo = new Nodo(producto)

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo
      nuevoNodo.siguiente = nuevoNodo
      nuevoNodo.anterior = nuevoNodo
    } else {
      const ultimo = this.cabeza.anterior

      ultimo.siguiente = nuevoNodo
      nuevoNodo.anterior = ultimo
      nuevoNodo.siguiente = this.cabeza
      this.cabeza.anterior = nuevoNodo
    }

    this.tamanio++
  }
}

export default ListaCircular