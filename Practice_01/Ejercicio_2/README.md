# Practice 01 — Carrusel de Productos (Product Carousel)

**Desarrollador:** Andre Rodriguez  
**Código:** 2231841  
**Materia:** Estructura de Datos 2  
**Profesor:** Jonathan Lopez Londoño  

---

## Descripción del ejercicio

> Develop a React application that displays products in a carousel. The data structure must be a doubly linked circular list, where the last product links back to the first and vice versa. The parent component stores the product list in useState and sends the information to the child component using props, which will display the current product.

Esta práctica consiste en construir una aplicación en React que muestre productos en un carrusel. La estructura de datos utilizada es una **lista doblemente enlazada circular**, donde cada producto conoce al siguiente y al anterior, y el último producto conecta de vuelta al primero. El componente padre guarda la lista en `useState` y le pasa el producto actual al hijo mediante `props`.

## Requisitos del ejercicio y cómo se cumplen

### 1. Botones para navegar al producto siguiente y anterior
Se implementaron dos botones de navegación en el componente padre `App.jsx`. El botón de siguiente llama a la función `siguiente` que mueve el puntero al nodo siguiente de la lista enlazada. El botón de anterior llama a la función `anterior` que mueve el puntero al nodo previo.

<button className="btn-nav btn-anterior" onClick={anterior}>
  &#8592;
</button>

<button className="btn-nav btn-siguiente" onClick={siguiente}>
  &#8594;
</button>


### 2. Comportamiento circular al llegar al inicio o al final
La circularidad no se logra con el operador `%` como en un array simple, sino que está construida directamente en la estructura de datos. Cada nodo de la lista tiene un puntero `siguiente` y un puntero `anterior`. El último nodo apunta de vuelta al primero y el primero apunta hacia atrás al último, formando un ciclo cerrado.

// Al agregar el ultimo nodo, se conecta de vuelta a la cabeza
nuevoNodo.siguiente = this.cabeza
this.cabeza.anterior = nuevoNodo

Entonces al navegar, simplemente se sigue el puntero del nodo actual:

const siguiente = () => {
  setNodoActual(prev => {
    setIndice(i => (i + 1) % listaRef.current.tamanio)
    return prev.siguiente  // sigue el puntero de la lista enlazada
  })
}

const anterior = () => {
  setNodoActual(prev => {
    setIndice(i => (i - 1 + listaRef.current.tamanio) % listaRef.current.tamanio)
    return prev.anterior  // sigue el puntero hacia atras
  })
}

**Ejemplo de circularidad con 5 productos:**
| Posicion   | Siguiente  | Anterior   |
| Producto 1 | Producto 2 | Producto 5 |
| Producto 2 | Producto 3 | Producto 1 |
| Producto 3 | Producto 4 | Producto 2 |
| Producto 4 | Producto 5 | Producto 3 |
| Producto 5 | Producto 1 | Producto 4 |


### 3. Uso de useEffect para cambiar productos automáticamente
Se implementó un `useEffect` que usa `setInterval` para llamar a la función `siguiente` cada 4 segundos automáticamente. El `return` dentro del `useEffect` limpia el intervalo cuando el componente se desmonta para evitar problemas de memoria.

useEffect(() => {
  const intervalo = setInterval(() => {
    siguiente()
  }, 4000)
  return () => clearInterval(intervalo)
}, [])


### 4. Uso de props entre componente padre e hijo
El componente padre `App.jsx` le pasa tres props al componente hijo `ProductoCard.jsx`: el objeto del producto actual, el índice de posición, y el total de productos. El hijo solo recibe esos datos y los muestra, sin manejar ninguna lógica propia.

Padre enviando props:

<ProductoCard
  producto={nodoActual.producto}
  indice={indice}
  total={listaRef.current.tamanio}
/>

Hijo recibiendo props:

function ProductoCard({ producto, indice, total }) {
  return (
    <div className="producto-card">
      <span className="producto-badge">Producto {indice + 1} de {total}</span>
      <h2 className="producto-nombre">{producto.nombre}</h2>
      <p className="producto-descripcion">{producto.descripcion}</p>
      <p className="producto-precio">${producto.precio}</p>
    </div>
  )
}


## Explicación de cada archivo

### `main.jsx`
Punto de entrada de la aplicación. Monta el componente `App` dentro del `index.html`.

**Nota importante:** Se removió el `StrictMode` de React en este archivo. En modo desarrollo, `StrictMode` monta y desmonta los componentes dos veces intencionalmente para detectar efectos secundarios. Esto causaba que el `useEffect` del intervalo automático se registrara dos veces, haciendo que el carrusel saltara de dos en dos productos en lugar de uno. Al remover `StrictMode` el comportamiento es el esperado.

// Sin StrictMode para evitar doble ejecucion del intervalo
createRoot(document.getElementById('root')).render(
  <App />
)


### `helpers/ListaCircular.js` — Estructura de Datos
Contiene dos clases que implementan la lista doblemente enlazada circular.

**Clase `Nodo`:** Representa cada producto en la lista. Tiene tres propiedades: el producto con sus datos, el puntero `siguiente` al próximo nodo, y el puntero `anterior` al nodo previo.

**Clase `ListaCircular`:** Maneja la lista completa. El método `agregar` inserta nuevos nodos manteniendo siempre la circularidad. Cuando se agrega el primer nodo, sus punteros apuntan a sí mismo. Cuando se agregan más nodos, el nuevo nodo se inserta al final conectándose con el último nodo existente y con la cabeza de la lista.

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



### `App.jsx` — Componente Padre
Componente principal que contiene toda la lógica del carrusel.

**Estados que maneja:**
| Estado        | Descripción                                                                                                     |
| `listaRef`    | Referencia a la lista circular construida. Usa `useRef` porque no necesita re-renderizar la pantalla al cambiar |
| `nodoActual`  | El nodo de la lista que está siendo mostrado actualmente                                                        |
| `indice`      | Posición actual para mostrar al usuario en qué producto va                                                      |

**Hooks que usa:**
- `useState` — Para manejar el nodo actual y el índice
- `useEffect` — Dos usos: uno para construir la lista al iniciar, y otro para el intervalo automático
- `useRef` — Para guardar la referencia de la lista sin causar re-renders innecesarios

---

### `components/ProductoCard.jsx` — Componente Hijo
Componente simple que recibe datos del padre mediante props y los muestra en pantalla. No tiene estado propio ni lógica.

**Props que recibe:**
| Prop       | Tipo   | Descripción                                                         |
| `producto` | Object | Objeto con nombre, descripcion, precio e imagen del producto actual |
| `indice`   | Number | Posición actual en la lista (base 0)                                |
| `total`    | Number | Cantidad total de productos en la lista                             |


## Tecnologías utilizadas

- **React** 
- **JavaScript**
- **CSS3**