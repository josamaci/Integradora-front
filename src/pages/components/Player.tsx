const Player = ({ username }: { username: string }) => {
  return (
    <div className="p-1 m-1 rounded bg-white shadow-sm">
      <h1>{username}</h1>
    </div>
  )
}

export default Player