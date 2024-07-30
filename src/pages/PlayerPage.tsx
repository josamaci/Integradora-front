import { useParams } from "react-router-dom"
import { socket } from "../socket";
import { useEffect, useState } from "react";
import PlayerContentPage from "./PlayerContentPage";

const PlayerPage = () => {
  socket.connect()
  const userDefaultState = { id: null, info: { teamColor: null }, isAdmin: null, room: null, username: null };

  const [userInfo, setUserInfo] = useState(userDefaultState);
  const { room_id } = useParams()

  useEffect(() => {
    function onConnect() {
      socket.emit("join-player", room_id)

      socket.on('user-info', (user) => {
        localStorage.setItem('playerInfo', JSON.stringify(user))
        setUserInfo(user)
      })

      // socket.on('game-finished' , (winnerTeam) => )
    }

    function onDisconnect() {
      setUserInfo(userDefaultState);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  if (userInfo.id) {
    return (
      <PlayerContentPage userInfo={userInfo} socket={socket}/>
    )
  } else {
    return (
      <h1>Cargando...</h1>
    )
  }
}

export default PlayerPage