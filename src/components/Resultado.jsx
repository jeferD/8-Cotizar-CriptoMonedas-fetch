import styled from '@emotion/styled'
import React from 'react'


const Informacion = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;

    display: flex;

`
const Texto = styled.p`
    font-size: 20px;
    span{
        font-weight: 700;
        
    }
`
const Precio = styled.p`
    font-size: 30px;
    span{
        font-weight: 700;

    }
`
const Imagen = styled.img`
    display: block;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;
    width: 100px;
    height: 100px;
`
const Resultado = ({resultado}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado
  return (
    <Informacion>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />
        <div>
            <Precio>El precio es de: <span>{PRICE}</span></Precio>
            <Texto>El precio mas alto del dia: <span>{HIGHDAY}</span></Texto>
            <Texto>El precio mas bajo del dia: <span>{LOWDAY}</span></Texto>
            <Texto>Variacion ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Ultima Actualizacion: <span>{LASTUPDATE}</span></Texto>  
        </div>
    </Informacion>
  )
}

export default Resultado