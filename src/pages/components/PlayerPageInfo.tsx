/* eslint-disable @typescript-eslint/no-explicit-any */
const PlayerPageInfo = ({ userInfo, colorName }: {userInfo: any, colorName: string}) => {

  let colorLabel = "ROSA";
  let colorStyleH1 = "font-bold px-1 text-";
  let colorHorse = `/assets/`;
  let colorBackground = "shadow w-3/4 text-justify p-2 rounded-md bg-";

  switch (colorName) {
    case 'ROJO': colorLabel = "ROJO"; colorStyleH1 += "red-800"; colorHorse += `horse-red.png`; colorBackground += "red-200"; break;
    case 'VERDE': colorLabel = "VERDE"; colorStyleH1 += "green-800"; colorHorse += `horse-green.png`; colorBackground += "green-200"; break;
    case 'AZUL': colorLabel = "AZUL"; colorStyleH1 += "blue-800"; colorHorse += `horse-blue.png`; colorBackground += "blue-200"; break;
    case 'AMARILLO': colorLabel = "AMARILLO"; colorStyleH1 += "yellow-800"; colorHorse += `horse-yellow.png`; colorBackground += "yellow-200"; break;
    case 'ROSA': colorLabel = "ROSA"; colorStyleH1 += "pink-800"; colorHorse += `horse.png`; colorBackground += "pink-200"; break;
    default: colorLabel = "ROSA"; colorStyleH1 += "pink-800"; colorHorse += `horse.png`; colorBackground += "pink-200"; break;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between bg-gray-50">
      <div className="flex mt-5">
        <h2>¡Hola!</h2>
        <h1 className="font-semibold mx-1">{userInfo.username}</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <p>Tu equipo es el</p>
          <h1 className={colorStyleH1}>{colorLabel}</h1>
        </div>
        <div className={colorBackground}>
          <img src={colorHorse} alt="Caballo" />
        </div>
        <h1 className="text-base mt-6 font-medium">Tip</h1>
        <p className="text-gray-500 text-sm text-center m-1">Cuanto más rápido des taps, más rápido avanzará tu caballo</p>
      </div>
      <p className="text-gray-400">Esperando que inicie la partida...</p>
    </div>
  )

}

export default PlayerPageInfo