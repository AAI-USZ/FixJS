function (newLapTime) {
  socket.emit('update laptime', { lapTime: newLapTime });
}