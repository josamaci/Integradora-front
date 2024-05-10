import { useEffect, useRef } from 'react';
import { IRefPhaserGame, CaballosGame } from '../game/CaballosGame';
import { socket } from '../socket';
import { Caballos } from '../game/scene/Caballos';

const GamePage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  socket.connect()
  useEffect(() => {
    function onConnect() {
      socket.emit("join-viewer", { viewer: 'viewer', room: userInfo.room })
    }

    function onDisconnect() {}

    function onNewState(state: any) {
      moveSprite(state)
    }

    socket.on('connect', onConnect);
    socket.on('new-state', onNewState);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const moveSprite = (state: any) => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Caballos;

      if (scene && scene.scene.key === 'Caballos') {
        scene.handleHorseMoved(state);
      }
    }

  }

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    //TODO: Emitir al socket el evento de cambio de scene/fin de juego
  }

  return (
    <div id="app">
      <CaballosGame ref={phaserRef} currentActiveScene={currentScene} />
    </div>
  )
}

export default GamePage