import { useParams } from "react-router-dom"
import { socket } from "../socket";
import { useEffect, useState } from "react";
import PlayerPage from "./PlayerPage";

const WaitingPage = () => {
  socket.connect()
  const userDefaultState = { id: null, info: { teamColor: null }, isAdmin: null, room: null, username: null };

  const [userInfo, setUserInfo] = useState(userDefaultState);
  const { room_id } = useParams()

  useEffect(() => {
    function onConnect() {
      socket.emit("join-player", room_id)

      socket.on('user-info', (user) => {
        setUserInfo(user)
      })
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
      <PlayerPage userInfo={userInfo} socket={socket}/>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default WaitingPage