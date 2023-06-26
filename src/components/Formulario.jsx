import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/moneda';
import Error from './Error';
const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    border-radius: 10px;
    text-transform: uppercase;
    font-size: 20px;
    margin-top: 20px;

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`;

export const Formulario = ({setMonedas}) => {
  const [critos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [SelectMonedas, stateMoneda] = useSelectMonedas('Elige tu moneda', monedas) 
  const [SelectCriptomoneda, stateCriptomoneda] = useSelectMonedas('Elige tu criptomoneda', critos) 

  useEffect(()=>{
    const consultarAPI = async () =>{
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=COP'

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      console.log('respuesta',respuesta,'resultado', resultado.Data)

      const arrayCriptos = resultado.Data.map(cripto=>{
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })
      console.log('Objeto data cripto: ',arrayCriptos)
      setCriptos(arrayCriptos)
    }

    consultarAPI();
  }, [])


  const handleSubmit = e =>{
    e.preventDefault()

    console.log('Enviando Formulario')
    console.log('stateMoneda-stateCriptomoneda', stateMoneda,stateCriptomoneda)

    if([stateMoneda,stateCriptomoneda].includes('')){
      console.log('ERROR')
      setError(true)
      return
    }
    setError(false)
    setMonedas({
      moneda: stateMoneda,
      criptoMoneda: stateCriptomoneda
    })
  }
  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
          
          <SelectMonedas/>
          <SelectCriptomoneda/>
          <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
    
  )
}
