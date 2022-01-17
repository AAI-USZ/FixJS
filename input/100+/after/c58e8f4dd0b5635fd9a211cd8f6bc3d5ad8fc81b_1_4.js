function emitQuestion() {
    io.sockets.emit("question", {
      question: question.question
    });
  }