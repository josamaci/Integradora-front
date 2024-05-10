import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Player from "./Player";

const PlayersList = ({socket}: {socket: Socket}) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    function onConnectToCaballos({ msg, users }: { msg: string, users: [] }) {
      console.log(msg);
      setUsers(users)
    }

    socket.on('connect-to-caballos', onConnectToCaballos);

    return () => { };
  }, []);

  return (
    <div className="jugadores-container bg-blue-200 p-2 rounded-md">
      <h1 className="font-bold text-xl px-1">Jugadores</h1>
      <div className="flex flex-row flex-wrap justify-start">
        {
          users.map((user) => <Player key={user['id']} username={user['username']} />)
        }
      </div>
    </div>
  )
}

export default PlayersList