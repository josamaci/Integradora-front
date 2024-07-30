/* eslint-disable @typescript-eslint/no-explicit-any */
import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";

const options = {
  chartArea: { width: "50%" },
  hAxis: {
    title: "Equipos",
    minValue: 0,
  },
  vAxis: {
    title: "Puntos",
  },
  legend: {position: 'none'},
  animation: {
    startup: true,
    duration: 1000,
    easing: 'out',
  },
};

const optionsLine = {
  title: 'Promedio de Taps por intervalo de tiempo',
  chartArea: { width: "50%" },
  hAxis: {
    title: "Tiempo",
  },
  vAxis: {
    title: "Promedio de Taps",
  },
  series: {
    0: { color: 'red' },
    1: { color: 'green' },
    2: { color: 'blue' },
    3: { color: 'yellow' },
    4: { color: 'pink' },
  },
  legend: {position: 'none'},
  displayLegendDots:true,
  pointSize: 5,
  lineWidth: 2,
  animation: {
    startup: true,
    duration: 1000,
    easing: 'out',
  },
  tooltip: { isHtml: true },

};


const data:Array<any> = []
const lineData:Array<any> = []

const AdminStatisticsComponent = ({roomInfo}: {roomInfo: any}) => {

  const gameState = roomInfo.gameState;
  console.log(gameState)

  data.push(... gameState.barData)
  lineData.push(... gameState.linearData);

  let colorLabel = "ROSA";
  let colorStyleH1="font-semibold mx-1 ";
  let colorHorse=`/assets/`;
  let colorBackground = "shadow w-1/2 text-justify p-2 rounded-md bg-";

  switch(roomInfo.winner){
    case 'red': colorLabel = "ROJO"; colorStyleH1+="text-red-800"; colorHorse+=`horse-red.png`; colorBackground += "red-200"; break;
    case 'green': colorLabel = "VERDE"; colorStyleH1+="text-green-800"; colorHorse+=`horse-green.png`; colorBackground += "green-200"; break;
    case 'blue': colorLabel = "AZUL"; colorStyleH1+="text-blue-800"; colorHorse+=`horse-blue.png`; colorBackground += "blue-200"; break;
    case 'yellow': colorLabel = "AMARILLO"; colorStyleH1+="text-yellow-800"; colorHorse+=`horse-yellow.png`; colorBackground += "yellow-200"; break;
    case 'gray': colorLabel = "ROSA"; colorStyleH1+="text-pink-800"; colorHorse+=`horse.png`; colorBackground += "pink-200"; break;
    default: colorLabel = "ROSA"; colorStyleH1+="text-pink-800"; colorHorse+=`horse.png`; colorBackground += "pink-200"; break;
  }
  
  const tamanioReloj = 35;
  const tamanioMedallas = 25;

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center ">
        <div className="flex w-full justify-center mt-10">
          
          <div className="w-1/3 ">

            <div className="flex mt-5 justify-left">
              <img className="align-self-center ml-5" src="/assets/time.png" alt="Tiempo" width={tamanioReloj} height={tamanioReloj} />
              <h2 className="align-self-center pl-2 font-bold align-content-center">{gameState.winner.gameTime} segundos</h2>
            </div>

            <div className="mt-5 justify-left">
              <h1 className="align-self-center ml-7 font-bold ">Promedio de taps del equipo ganador</h1>
              <div className="flex">
                <img className="align-self-center ml-5" src="/assets/medal.png" alt="Ganador" width={tamanioMedallas} height={tamanioMedallas} />
                <h2 className="align-self-center pl-2">Equipo {(colorLabel.charAt(0).toUpperCase() + colorLabel.slice(1).toLowerCase())} - {gameState.winner.taps} taps</h2>
              </div>
            </div>

            <div className="mt-5 justify-left">
              <h1 className="align-self-center ml-7 font-bold ">MVP</h1>
              <div className="flex">
                <img className="align-self-center ml-5" src="/assets/medal.png" alt="Tiempo" width={tamanioMedallas} height={tamanioMedallas} />
                <h2 className="align-self-center pl-2">{gameState.winner.MVP.username} - {gameState.winner.MVP.taps} taps</h2>
              </div>
            </div>

          </div>

          <div className="w-1/3 font-bold text-3xl">
            <div className="flex mt-5 justify-center">
              <h2>¡FELICIDADES AL EQUIPO</h2>
              <h1 className={colorStyleH1}>{colorLabel}</h1>
              <h2>!</h2>
            </div>
            <div className="flex flex-col items-center my-2">
              <div className={colorBackground}>
                <img src={colorHorse} alt="Caballo" />
              </div>
            </div>
          </div>

          <div className="w-1/3"></div>

        </div>

        <div className="flex w-full justify-center">
          <div className="w-1/2">
            <BarChartComponent data={data} options={options} />
          </div>
          <div className="w-1/2">
            <LineChartComponent data={lineData} options={optionsLine} />
          </div>
        </div>
        
      </div>
    )
}

export default AdminStatisticsComponent