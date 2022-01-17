function (newLapTime) {
  console.log("NEW LAPTIME!!!")
  console.log(newLapTime);
  socket.emit('update laptime', { lapTime: newLapTime });
}