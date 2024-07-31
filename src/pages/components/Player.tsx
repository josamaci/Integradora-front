const Player = ({ username , team}: { username: string, team:string }) => {

  let colorBackground = "p-1 m-1 font-bold rounded shadow-sm bg-";

  switch (team) {
    case 'red': colorBackground += "red-500 text-white"; break;
    case 'green': colorBackground += "green-500 text-white"; break;
    case 'blue': colorBackground += "blue-600 text-white"; break;
    case 'yellow': colorBackground += "yellow-500 text-white"; break;
    case 'gray': colorBackground += "pink-500 text-white"; break;
    default: colorBackground += "white"; break;
  }

  return (
    <div className={colorBackground}>
      <h1 >{username}</h1>
    </div>
  )
}

export default Player