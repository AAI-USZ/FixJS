function (newLapTime) {
  console.log('update laptime to: ' + newLapTime); // TODO debug to see if early lapTime emit causes connection error

  socket.emit('update laptime', { lapTime: newLapTime });
}