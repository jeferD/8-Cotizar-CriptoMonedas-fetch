import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import ImagenCripto from './img/imagen-criptos.png'
import { Formulario } from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
const Contenedor =  styled.div`  
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width:80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`  
  font-family: 'Lato', sans-serif;
  color: #FFF;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 34px;
  text-align: center;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;
function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  
  useEffect(()=>{ 
    if(Object.keys(monedas).length>0){
      console.log('monedas..................',monedas)
      const {moneda, criptoMoneda} = monedas
      console.log('moneda, criptoMoneda',moneda, criptoMoneda)
      const cotizarCripto = async ()=>{ 
        setCargando(true)
        setResultado({})

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        console.log(url)

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        console.log('resultado.DISPLAY[criptoMoneda][moneda]',resultado.DISPLAY[criptoMoneda][moneda])
        setResultado(resultado.DISPLAY[criptoMoneda][moneda])
        setCargando(false)
      }

      cotizarCripto()

    }
  },[monedas])

  return (
    <> 
      <Contenedor> {/* este es un styledCompone de estilos y estos se encuentran arriba del return declarados */}
        <Imagen src={ImagenCripto} alt="Imagenes Criptomonedas" />
        <div>
          <Heading>Jeferson Delgado</Heading>
          <Formulario
            setMonedas= {setMonedas}
          />
          {cargando && <Spinner/>}
          {resultado.PRICE && 
            <Resultado
              resultado={resultado}
            />
          }
          
        </div>
      </Contenedor>
    </>
  )
}

export default App
