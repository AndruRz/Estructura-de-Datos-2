class NodoInversionista {
  constructor(inversionista) {
    this.inversionista = inversionista;
    this.siguiente = null;
    this.anterior = null;
  }
}

class ListaInversionistas {
  constructor() {
    this.cabeza = null;
    this.tamanio = 0;
  }

  agregar(inversionista) {
    const nuevo = new NodoInversionista(inversionista);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      nuevo.siguiente = this.cabeza;
      nuevo.anterior = this.cabeza;
      this.tamanio++;
      return;
    }
    const ultimo = this.cabeza.anterior;
    ultimo.siguiente = nuevo;
    nuevo.anterior = ultimo;
    nuevo.siguiente = this.cabeza;
    this.cabeza.anterior = nuevo;
    this.tamanio++;
  }

  eliminar(id) {
    if (!this.cabeza) return;
    let actual = this.cabeza;
    for (let i = 0; i < this.tamanio; i++) {
      if (actual.inversionista.id === id) {
        if (this.tamanio === 1) {
          this.cabeza = null;
          this.tamanio--;
          return;
        }
        actual.anterior.siguiente = actual.siguiente;
        actual.siguiente.anterior = actual.anterior;
        if (actual === this.cabeza) {
          this.cabeza = actual.siguiente;
        }
        this.tamanio--;
        return;
      }
      actual = actual.siguiente;
    }
  }

  aArray() {
    if (!this.cabeza) return [];
    const resultado = [];
    let actual = this.cabeza;
    do {
      resultado.push(actual.inversionista);
      actual = actual.siguiente;
    } while (actual !== this.cabeza);
    return resultado;
  }
}

export { ListaInversionistas };