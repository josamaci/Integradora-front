import { useEffect, useState } from "react";
import { socket } from "../socket";
import UsersList from "./components/PlayersList";
import { Link } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import ReactModal from "react-modal";

const AdminPage = () => {
  socket.connect()
  const userDefaultState = { id: null, info: {}, isAdmin: null, room: null, username: null };

  const [userInfo, setUserInfo] = useState(userDefaultState);
  const [isConfigReady, setIsConfigReady] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  console.log(userInfo.room);
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  ReactModal.setAppElement('#root')

  const configs = {
    caballosCount: 5,
    titulo: 'Gracias por participar',
    descripcion: 'Por favor llena el siguiente formulario para ayudarnos a mejorar Momentum',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSefjm1myoJiP4PByTaRHZq2CPaWz4EtdubVIrMJ_N1nDfLP6g/viewform',
  }

  // Componente
  if (userInfo.id) {
    const location = window.location.href;
    const z = {
      overlay: {
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
      content: {zIndex: 1001}
    }
    return (
      <div id="admin" className="jugadores h-screen bg-[#00000009]">
        <div className="p-3 h-full">

          <ReactModal
            isOpen={showModal}
            contentLabel="QR Code"
            style={z}
          >
            <div className="flex justify-end">
              <button className="w-min h-min px-0" onClick={closeModal}>
                <strong style={{ fontSize: '2em' }}>X</strong>
              </button>
            </div>
            
            <div className="flex justify-center">
              <QRCodeSVG width={"500px"} height={""} value={`${location}lobby/${userInfo.room}`} />
            </div>
          </ReactModal>

          <div className="info flex justify-between gap-4">

            <div className="bg-white rounded-lg flex">
              <img src="/assets/carrera-caballo-game.png" alt="Carrera de caballos" className="w-80" />
              <div className="m-2">
                <h1 className="font-bold text-2xl">Carrera de caballos</h1>
                <p className="text-gray-500">Junto a tu equipo logra que tu caballo llegue primero a la meta, <br /> mientras más taps más rápido se moverá tu caballo</p>
              </div>
            </div>


            {
              isConfigReady ? <div className="bg-white p-2 flex rounded-lg">
                <div className="mr-4">
                  <h1 className="font-bold text-xl">Código de la sala</h1>
                  <p id="roomId">{`${location}lobby/${userInfo.room}`}</p>
                </div>
                <a onClick={openModal} className="cursor-pointer">
                  <QRCodeSVG value={`${location}lobby/${userInfo.room}`} />
                </a>
              </div>
                :
                <div className="bg-white p-2 flex rounded-lg">
                  <div className="mr-4">
                    <h1 className="font-bold text-xl">Antes de empezar configura la sala</h1>
                  </div>
                </div>
            }

          </div>

          {
            isConfigReady ?
              <div className="w-full flex justify-center">
                <Link to='/caballos' target="_blank" rel="noopener noreferrer"
                  className="text-center text-white font-bold p-2 m-1 bg-blue-600 rounded"
                >
                  Iniciar Juego
                </Link>

                {/* <button className="text-center text-white font-bold p-2 m-1 bg-blue-600 rounded"
                onClick={ () => socket.emit('reset-game', userInfo)}
              >
                Reiniciar Juego
              </button> */}
              </div> : <div className="w-full flex justify-center"></div>
          }

          <div className="flex w-full gap-1">
            <div id="config" className="bg-blue-200 p-2 rounded-md w-1/4">
              <div className="config-input">
                <label htmlFor="">¿Cuántos caballos (equipos) deseas? <span style={{ color: 'red' }}>*</span></label>
                <select disabled={isConfigReady} name="example" defaultValue={5} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  configs.caballosCount = Number(e.target.value)
                }}>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="config-input">
                <label htmlFor="">Título</label>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length === 0) {
                    configs.titulo = '¡Gracias por participar!'
                  } else {
                    configs.titulo = e.target.value
                  }
                }} />
              </div>
              <div className="config-input">
                <label htmlFor="">Descripción</label>
                <textarea name="descripcion" id="descripcion" rows={2} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  if (e.target.value.length === 0) {
                    configs.descripcion = 'Por favor llena el siguiente formulario para ayudarnos a mejorar Momentum'
                  } else {
                    configs.descripcion = e.target.value
                  }
                }}></textarea>
              </div>
              <div className="config-input">
                <label htmlFor="">Link</label>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length === 0) {
                    configs.link = 'https://docs.google.com/forms/d/e/1FAIpQLSefjm1myoJiP4PByTaRHZq2CPaWz4EtdubVIrMJ_N1nDfLP6g/viewform'
                  } else {
                    configs.link = e.target.value
                  }
                }} />
              </div>
              <button className="text-white font-bold p-1 mt-3 bg-blue-600 rounded h-min" onClick={() => {
                setIsConfigReady(true);
                socket.emit('set-config', { room_id: userInfo.room, configs: configs });
              }}>
                Guardar Configuración
              </button>
            </div>
            <UsersList socket={socket} />

          </div>

        </div>
      </div>
    )
  }
  else {
    return <p>Cargando...</p>
  }
}

export default AdminPage