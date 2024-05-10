import { useEffect, useState } from "react";
import { socket } from "../socket";
import UsersList from "./components/PlayersList";
import { Link } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';

const AdminPage = () => {
  socket.connect()
  const userDefaultState = { id: null, info: {}, isAdmin: null, room: null, username: null };

  const [userInfo, setUserInfo] = useState(userDefaultState);
  useEffect(() => {
    function onConnect() {
      socket.emit("join-admin")

      socket.on('user-info', (user) => {
        localStorage.setItem('userInfo', JSON.stringify(user))
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
    const location = window.location.href;
    return (
      <div id="admin" className="jugadores h-screen bg-gray-50">
        <div className="p-3">
          <div className="info flex justify-between">
            <div>
              <h1 className="font-bold text-xl">Carrera de caballos</h1>
              <p>Junto a tu equipo logra que tu caballo llegue primero a la meta </p>
            </div>
            <div className="bg-white p-2 flex rounded-lg">
              <div className="mr-4">
                <h1 className="font-bold text-xl">Código de la sala</h1>
                <p id="roomId">{`${location}lobby/${userInfo.room}`}</p>
              </div>
              <QRCodeSVG value={`${location}lobby/${userInfo.room}`} />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Link to='/caballos' target="_blank" rel="noopener noreferrer"
              className="text-center text-white font-bold p-2 m-1 bg-blue-600 rounded"
            >
              Iniciar Juego
            </Link>
          </div>
          <UsersList socket={socket} />

        </div>
      </div>
    )
  }
  else {
    return <p>Loading...</p>
  }
}

export default AdminPage