# Practice 01 — Sistema de Turnos (Turner System)

**Desarrollador:** Andre Rodriguez  
**Código:** 2231841  
**Materia:** Estructura de Datos 2  
**Profesor:** Jonathan Lopez Londoño  

## Descripción del ejercicio

> Create a React application that simulates a turner system (like in a bank or clinic). The turner must be organized in a circular list, so that after the last queue, the system automatically returns to the first.

Esta práctica consiste en construir una aplicación en React que simule un sistema de turnos como el que se usa en bancos o clínicas. Los turnos se organizan en una **lista circular**, lo que significa que al llegar al último turno de la lista, el sistema regresa automáticamente al primero, sin necesidad de reiniciar manualmente.

## Requisitos del ejercicio y cómo se cumplen
Se implementó un campo de texto `input` y un botón **Agregar** en el componente padre `App.jsx`. Cuando el usuario escribe un nombre de turno y presiona el botón, la función `agregarTurno` valida que el campo no esté vacío y usa el **spread operator** (`...turnos`) para crear una nueva copia del array con el turno añadido al final, actualizando el estado con `setTurnos`.

const agregarTurno = () => {
  if (nuevoTurno.trim() !== '') {
    setTurnos([...turnos, nuevoTurno])
    setNuevoTurno('')
  }
}

### 2. Botón para avanzar al siguiente turno (comportamiento circular)
Se implementó un botón **Siguiente Turno** que llama a la función `siguienteTurno`. Esta función usa el operador módulo `%` para lograr el comportamiento circular: cuando el índice llega al último elemento del array, la operación `% turnos.length` lo regresa automáticamente a `0`, es decir, al primer turno.

const siguienteTurno = () => {
  setIndiceActual((indiceActual + 1) % turnos.length)
}

**Ejemplo con 3 turnos:**
| Índice actual | Operación   | Resultado            |
|---            |---          |---                   |
| 0             | (0 + 1) % 3 | 1                    |
| 1             | (1 + 1) % 3 | 2                    |
| 2             | (2 + 1) % 3 | 0 (vuelve al inicio) |

### 3. Uso de useEffect para mostrar un mensaje cuando el turno cambia
Se implementó `useEffect` con `indiceActual` como dependencia. Cada vez que el índice cambia, es decir, cada vez que se avanza al siguiente turno, el hook se ejecuta automáticamente y actualiza el mensaje en pantalla con el nombre del turno actual.

useEffect(() => {
  if (turnos.length > 0) {
    setMensaje(`Turno actualizado: ${turnos[indiceActual]}`)
  }
}, [indiceActual])

El array `[indiceActual]` al final del `useEffect` es el **array de dependencias**, que le indica a React que solo debe ejecutar este efecto cuando `indiceActual` cambie.


### 4. Uso de props entre componente padre e hijo
El componente padre `App.jsx` le pasa información al componente hijo `TurnoActual.jsx` mediante **props**. El padre tiene el estado y la lógica, y el hijo solo recibe datos para mostrarlos, sin manejar ninguna lógica propia.


**Padre enviando props:**
<TurnoActual
  turno={turnos[indiceActual]}
  total={turnos.length}
  indice={indiceActual}
/>

**Hijo recibiendo props:**
function TurnoActual({ turno, total, indice }) {
  return (
    <div className="turno-card">
      <span className="turno-badge">EN ATENCIÓN</span>
      <h2 className="turno-nombre">{turno}</h2>
      <p className="turno-progreso">Turno {indice + 1} de {total}</p>
    </div>
  )
}

## Explicación de cada archivo

### `main.jsx`
Punto de entrada de la aplicación. Es el archivo que React usa para montar toda la aplicación dentro del `index.html`. No se modifica durante el desarrollo de la práctica.

### `App.jsx` — Componente Padre
Es el componente principal y padre de la aplicación. Aquí vive toda la lógica del sistema de turnos.

**Estados que maneja:**
| Estado         | Descripción                                                |
|---             |---                                                         |
| `turnos`       | Array con la lista de todos los turnos registrados         |
| `indiceActual` | Número entero que indica qué turno está activo actualmente |
| `nuevoTurno`   | String que guarda lo que el usuario escribe en el input    |
| `mensaje`      | String con el mensaje de notificación del turno actual     |


**Funciones que contiene:**
| Función          | Descripción                                             |
|                  |
| `siguienteTurno` | Avanza al siguiente turno usando el operador módulo para    el comportamiento circular 
                                                                            
| `agregarTurno`   | Valida el input y agrega un nuevo turno al array usando spread operator |

**Hooks que usa:**
- `useState` — Para manejar los cuatro estados descritos arriba
- `useEffect` — Para detectar cuando cambia el turno y actualizar el mensaje


### `components/TurnoActual.jsx` — Componente Hijo
Componente simple que recibe datos del padre mediante props y los muestra en pantalla. No tiene estado propio ni lógica, su única responsabilidad es presentar la información del turno actual.

**Props que recibe:**
| Prop    | Tipo   | Descripción                               |
| `turno` | String | Nombre del turno actualmente en atención  |
| `total` | Number | Cantidad total de turnos en la lista      |
| `indice`| Number | Posición actual en la lista (base 0)      |


## Tecnologías utilizadas

- **React** 
- **JavaScript**
- **CSS3**