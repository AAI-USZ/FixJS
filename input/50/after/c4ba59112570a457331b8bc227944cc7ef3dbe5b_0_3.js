function send_answer(answer) {
  socket.emit("answer", {
    answer: answer
  });
}