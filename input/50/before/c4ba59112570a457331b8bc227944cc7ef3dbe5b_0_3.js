function send_answer(answer) {
  socket.emit("answer", {
    id: question_id,
    answer: answer
  });
}