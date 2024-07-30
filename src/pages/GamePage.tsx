/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, CaballosGame } from '../game/CaballosGame';
import { socket } from '../socket';
import { Caballos } from '../game/scene/Caballos';
import { User } from '../types/User';
import AdminStatisticsComponent from "./components/AdminStatistics";
import { EventBus } from '../game/EventBus';

const GamePage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // const userDefaultState = { id: null, info: {playerCount: 1}, isAdmin: null, room: null, username: null };
  const [viewerInfo, setviewervInfo] = useState<User>();
  const [viewerStatistics, setViewerStatistics] = useState<any>();

  socket.connect()
  useEffect(() => {
    function onConnect() {
      socket.emit("join-viewer", { viewer: 'viewer', room: userInfo.room })
    }

    function onDisconnect() { }

    function onNewState(state: any) {
      moveSprite(state)
    }

    function onUserInfo(user: User) {
      setviewervInfo(user)
    }

    function onViewerStatistics(statistics: any) {
      setViewerStatistics(statistics)
    }

    EventBus.on('end-game', () => {
      socket.emit('end-game', userInfo.room)
    });

    socket.on('connect', onConnect);
    socket.on('new-state', onNewState);
    socket.on('user-info', onUserInfo);
    socket.on('disconnect', onDisconnect);
    socket.on('viewer-statistics', onViewerStatistics);

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

  const setBackground = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Caballos;

      if (scene && scene.scene.key === 'Caballos') {
        scene.setBackground(viewerInfo?.info.playersCount ?? 1);
      }
    }
  }

  // const setCaballosCount = () => {
  //   if (phaserRef.current) {
  //     const scene = phaserRef.current.scene as Caballos;

  //     if (scene && scene.scene.key === 'Caballos') {
  //       scene.setCaballosCount(viewerInfo?.info.caballosCount ?? 5);
  //     }
  //   }
  // }

  const setTeamsColor = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Caballos;

      if (scene && scene.scene.key === 'Caballos') {
        scene.setTeamsColor(viewerInfo?.info.teamsColor ?? ['red', 'green', 'blue', 'yellow', 'gray']);
      }
    }
  }

  // Event emitted from the PhaserGame component
  // const currentScene = (scene: Phaser.Scene) => { }
  const currentScene = () => { }

  const gameStarted = () => {
    socket.emit('start-game', userInfo.room)
  }


  if (viewerStatistics!=null) {
    return <div>
      <h1></h1>
      <AdminStatisticsComponent roomInfo={viewerStatistics}/>
    </div>
  } else {
    return (
      <div id="app" className='h-screen flex justify-center items-center'>
        <CaballosGame
          ref={phaserRef}
          currentActiveScene={currentScene}
          gameStarted={gameStarted}
          setBackground={setBackground}
          // setCaballosCount={setCaballosCount}
          setTeamsColor={setTeamsColor}
        />
      </div>
    )
  }

}

export default GamePage