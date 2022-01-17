function newQuestion() {
    question = Quiz.pick(questions);

    if (question) {
      io.sockets.emit("question", {
        id: question.id,
        question: question.question
      });
    } else {
      io.sockets.emit("end of quiz", null);
    }
  }