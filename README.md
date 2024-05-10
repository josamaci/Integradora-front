> [!CAUTION]
> Antes de comenzar esta guía sigue los pasos para el [backend](https://github.com/josamaci/Integradora-back).

# Juegos masivos de corta duración

Este proyecto consiste en una plataforma de juegos masivos en línea de corta duración, adaptándose al tiempo disponible y la cantidad de personas para fomentar la participación activa y en grupo.

Esta plataforma ofrece juegos diseñados para ser divertidos y educativos, con temáticas que puedan complementar el contenido de una charla o salón de clases.

## Instalación

### Frontend

1. Deberán bajar este repositorio usando:
```powershell
git clone https://github.com/josamaci/Integradora-front.git
```

2. Dentro del directorio del proyecto ```Integradora-front``` instalan las dependencias:
```powershell
npm install
```

### Tunnel Cloudflare Zero Trust

1. Descargar Tunnel Cloudflare usando las siguientes opciones:

- Windows 64bit: [cloudflared-windows-amd64](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe)

- macOS 64bit: [cloudflared-darwin-amd64](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz)

- Linux: [Linux links](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/#linux)


> [!NOTE]
> Pueden entrar a este [link](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads) en caso de querer usar una opción de descarga diferente.

## Uso

### Frontend

Una vez se haya instalado todas las dependencias pueden ejecutar el proyecto usando:
```powershell
npm run dev
```
Se debe ver el siguiente resultado en su consola:

![image](https://github.com/josamaci/Integradora-front/assets/73150508/0a1b583e-e8cb-4617-b238-3e12571fb90b)


> [!IMPORTANT]
> Para empezar a jugar pueden ver este [video](https://www.youtube.com/watch?v=-ap8isF823Q).

# Jugando online

> [!WARNING]
> Para este paso deben de tener descargado Tunnel Cloudflare Zero Trust que se realizó unos [pasos atrás](#tunnel-cloudflare-zero-trust)

Puedes seguir el siguiente tutorial para usar el tunel: 

[Tutorial](https://img.youtube.com/vi/wahtai8h0Uo/maxresdefault.jpg)](https://www.youtube.com/watch?v=wahtai8h0Uo)

## Créditos

Este proyecto fue desarrollado por:
- [Jairo Alcívar](https://github.com/JairoAb). :feelsgood:
- [José Macías](https://github.com/josamaci). :shipit:

Con la asesoría de [Javie Tibau](https://github.com/jtibau) :godmode:
