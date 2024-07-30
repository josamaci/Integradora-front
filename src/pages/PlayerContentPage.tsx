/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client"
import PlayerPageInfo from "./components/PlayerPageInfo";
import PlayerStatisticsComponent from "./components/PlayerStatistics";

const userDefaultState = { id: null, info: { teamColor: null }, isAdmin: null, room: null, username: null };
const PlayerContentPage = ({ socket, userInfo }: { socket: Socket, userInfo: typeof userDefaultState }) => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState({ winner: '', gameState: {} });
  const [isFinishReached, setIsFinishReached] = useState(false);

  useEffect(() => {
    function onStartGame() {
      setGameStarted(true)
    }

    function onFinishGame(state: any) {
      setGameState(state)
      setGameStarted(false)
    }

    function onOneFinishGame({ gameState }: { gameState: any }) {
      console.log(gameState);
      try {
        if (gameState[userInfo.info.teamColor!] >= 1020) {
          setIsFinishReached(true)
        }
      } catch (error) {
        setIsFinishReached(true)
      }
    }

    socket.on('start-game', onStartGame);
    socket.on('viewer-statistics', onFinishGame);
    socket.on('one-finish-game', onOneFinishGame);

    return () => { };
  }, []);

  if (isGameStarted && !isFinishReached) {
    let colorStyle = "button-ellipse-grow effect-ellipse-grow bg-red-500 after:bg-[#ffffff46] text-red-800 active:text-red-800 active:text-xl font-semibold transition-all duration-100";
    switch (userInfo.info.teamColor!) {
      case 'red': colorStyle = "button-ellipse-grow effect-ellipse-grow bg-red-500 after:bg-[#ffffff46] text-red-800 active:text-red-800 active:text-xl font-semibold transition-all duration-100"; break;
      case 'green': colorStyle = "button-ellipse-grow effect-ellipse-grow bg-green-500 after:bg-[#ffffff46] text-green-800 active:text-green-800 active:text-xl font-semibold transition-all duration-100"; break;
      case 'blue': colorStyle = "button-ellipse-grow effect-ellipse-grow bg-blue-500 after:bg-[#ffffff46] text-blue-800 active:text-blue-800 active:text-xl font-semibold transition-all duration-100"; break;
      case 'yellow': colorStyle = "button-ellipse-grow effect-ellipse-grow bg-yellow-500 after:bg-[#ffffff46] text-yellow-800 active:text-yellow-800 active:text-xl font-semibold transition-all duration-100"; break;
      case 'gray': colorStyle = "button-ellipse-grow effect-ellipse-grow bg-pink-500 after:bg-[#ffffff46] text-pink-800 active:text-pink-800 active:text-xl font-semibold transition-all duration-100"; break;
      default: colorStyle = "button-ellipse-grow effect-ellipse-grow bg-pink-500 after:bg-[#ffffff46] text-pink-800 active:text-pink-800 active:text-xl font-semibold transition-all duration-100"; break;
    }

    return (
      <div>
        <button
          className={colorStyle}
          onClick={() => socket.emit('tapping', userInfo)}
        >
          Tap!!!
        </button>
      </div>
    )
  } else if (gameState.winner !== '') {
    return <PlayerStatisticsComponent roomInfo={gameState} />
  } else if (isFinishReached) {
    let colorStyle = "font-semibold text-pink-800"
    switch (userInfo.info.teamColor!) {
      case 'red': colorStyle = "font-semibold text-red-800"; break;
      case 'green': colorStyle = "font-semibold text-green-800"; break;
      case 'blue': colorStyle = "font-semibold text-blue-800"; break;
      case 'yellow': colorStyle = "font-semibold text-yellow-800"; break;
      case 'gray': colorStyle = "font-semibold text-pink-800"; break;
      default: colorStyle = "font-semibold text-pink-800"; break;
    }
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className={colorStyle}>Felicidades, tu equipo llegó a la meta</h1>
      </div>
    )
  } else {

    if (userInfo.info.teamColor === 'red') {
      return (<PlayerPageInfo colorName={'ROJO'} userInfo={userInfo} />)
    } else if (userInfo.info.teamColor === 'green') {
      return (<PlayerPageInfo colorName={'VERDE'} userInfo={userInfo} />)
    } else if (userInfo.info.teamColor === 'blue') {
      return (<PlayerPageInfo colorName={'AZUL'} userInfo={userInfo} />)
    } else if (userInfo.info.teamColor === 'yellow') {
      return (<PlayerPageInfo colorName={'AMARILLO'} userInfo={userInfo} />)
    } else {
      return (<PlayerPageInfo colorName={'ROSA'} userInfo={userInfo} />)
    }
  }
}

export default PlayerContentPage