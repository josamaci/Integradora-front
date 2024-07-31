/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BarChartComponent from "./BarChartComponent";
import Player from "./Player";

const options = {
  chartArea: { width: "50%" },
  hAxis: {
    title: "Puntos",
    minValue: 0,
  },
  vAxis: {
    title: "Equipos",
  },
  legend: { position: 'none' }
};


const data: Array<any> = []

const PlayerStatisticsComponent = ({ roomInfo }: { roomInfo: any }) => {

  const playerInfo = JSON.parse(localStorage.getItem('playerInfo')!)

  const [showLastPage, setShowLastPage] = useState(false);

  const gameState = roomInfo.gameState;

  data.push(...gameState.barData)

  console.log(playerInfo);

  if (showLastPage) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex mt-5">
          <h1 className="font-semibold mx-1 text-xl">{playerInfo != null && playerInfo['info']['titulo'] != null ? playerInfo['info']['titulo'] : '¡Gracias por participar!'}</h1>
        </div>
        <div className="flex flex-col items-center my-2">
          <div className={`shadow w-1/2 text-justify p-2 rounded-md`}>
            <img src={`/assets/carrera-caballo-game.png`} alt="Juego de caballos" />
          </div>
        </div>
        <h1 className="text-center">{playerInfo != null && playerInfo['info']['descripcion'] != null ? playerInfo['info']['descripcion'] : 'Por favor llena el siguiente formulario para ayudarnos a mejorar Momentum'}</h1>
        <a className="text-blue-500" href={playerInfo != null && playerInfo['info']['link'] != null ? playerInfo['info']['link'] : 'https://docs.google.com/forms/d/e/1FAIpQLSefjm1myoJiP4PByTaRHZq2CPaWz4EtdubVIrMJ_N1nDfLP6g/viewform'} target="_blank">Formulario</a>
      </div>
    )
  } else {
    let colorLabel = "ROSA";
    let colorStyleH1 = "font-semibold mx-1 ";
    let colorHorse = `/assets/`;
    let colorBackground = "shadow w-1/2 text-justify p-2 rounded-md bg-";

    switch (roomInfo.winner) {
      case 'red': colorLabel = "ROJO"; colorStyleH1 += "font-semibold mx-1 text-red-800"; colorHorse += `horse-red.png`; colorBackground += "shadow w-1/2 text-justify p-2 rounded-md bg-red-200"; break;
      case 'green': colorLabel = "VERDE"; colorStyleH1 += "font-semibold mx-1 text-green-800"; colorHorse += `horse-green.png`; colorBackground += "shadow w-1/2 text-justify p-2 rounded-md bg-green-200"; break;
      case 'blue': colorLabel = "AZUL"; colorStyleH1 += "font-semibold mx-1 text-blue-800"; colorHorse += `horse-blue.png`; colorBackground += "shadow w-1/2 text-justify p-2 rounded-md bg-blue-200"; break;
      case 'yellow': colorLabel = "AMARILLO"; colorStyleH1 += "font-semibold mx-1 text-yellow-800"; colorHorse += `horse-yellow.png`; colorBackground += "shadow w-1/2 text-justify p-2 rounded-md bg-yellow-200"; break;
      case 'gray': colorLabel = "ROSA"; colorStyleH1 += "font-semibold mx-1 text-pink-800"; colorHorse += `horse.png`; colorBackground += "shadow w-1/2 text-justify p-2 rounded-md bg-pink-200"; break;
      default: colorLabel = "ROSA"; colorStyleH1 += "font-semibold mx-1 text-pink-800"; colorHorse += `horse.png`; colorBackground += "shadow w-1/2 text-justify p-2 rounded-md bg-pink-200"; break;
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Player key={playerInfo['id']} username={playerInfo['username']} team={playerInfo.info.teamColor}/>
        <div className="flex mt-5">
          <h2>¡El equipo</h2>
          <h1 className={colorStyleH1}>{colorLabel}</h1>
          <h2>gano!</h2>
        </div>
        <div className="flex flex-col items-center my-2">
          <div className={colorBackground}>
            <img src={colorHorse} alt="Caballo" />
          </div>
        </div>
        <h1>Estadísticas</h1>
        <BarChartComponent data={data} options={options} />
        <button
          className="w-1/2 text-center text-white font-bold h-min p-1 m-1 bg-blue-600 rounded"
          onClick={() => setShowLastPage(true)}
        >
          Continuar
        </button>
      </div>
    )
  }

}

export default PlayerStatisticsComponent