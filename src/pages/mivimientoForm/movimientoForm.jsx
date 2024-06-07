import React from 'react'

const  movimientoForm = () => {
  return (
    <main>
        <form action=''>
        <label htmlForm="">
            <span>Fecha del movimiento</span>
            <input id='fecha' type='date' placeholder='19-05-20222' />
        </label>
        <label htmlForm="">
            <span>Nombre del movimiento</span>
            <input id='nombre' type='text' placeholder=' compra de perro caliente' />
        </label>
        <label htmlForm="">
            <span>Valor del movimiento</span>
            <input id='valor' type='number' placeholder='20000' />
        </label>


        </form>
    </main>
  )
}

export default movimientoForm