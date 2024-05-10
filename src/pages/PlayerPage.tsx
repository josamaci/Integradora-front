import { useEffect, useState } from "react";
import { Socket } from "socket.io-client"

const userDefaultState = { id: null, info: { teamColor: null }, isAdmin: null, room: null, username: null };
const PlayerPage = ({ socket, userInfo }: { socket: Socket, userInfo: typeof userDefaultState }) => {
  const [isGameStarted, setGameState] = useState(false);

  useEffect(() => {
    function onStartGame() {
      setGameState(true)
    }

    socket.on('start-game', onStartGame);

    return () => { };
  }, []);

  if (isGameStarted) {
    return (
      <div>
        <button
          className={`button-ellipse-grow effect-ellipse-grow ${userInfo.info.teamColor === 'red' ? 'after:bg-red-50 active:text-red-700' : userInfo.info.teamColor === 'green' ? 'after:bg-green-50 active:text-green-700' : userInfo.info.teamColor === 'blue' ? 'after:bg-blue-50 active:text-blue-700' : userInfo.info.teamColor === 'yellow' ? 'after:bg-yellow-50 active:text-yellow-700' : 'after:bg-gray-50 active:text-gray-700'}`}
          onClick={() => {
            socket.emit('tapping', userInfo)
          }}
        >
          Tap!!!
        </button>
      </div>
    )
  } else {

    return (
      <div className="w-full h-screen flex flex-col items-center justify-between bg-gray-50">
        <h1 className="m-1 font-semibold">{userInfo.username}</h1>
        <div className={`shadow w-3/4 text-justify p-2 rounded ${userInfo.info.teamColor === 'red' ? 'bg-red-50' : userInfo.info.teamColor === 'green' ? 'bg-green-50' : userInfo.info.teamColor === 'blue' ? 'bg-blue-50' : userInfo.info.teamColor === 'yellow' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
          <p>
            Haz que el caballo de tu equipo llegue primero!!
          </p>
        </div>
        <p className="text-gray-400">...Esperando que inicie la partida</p>
      </div>

    )
  }
}

export default PlayerPage