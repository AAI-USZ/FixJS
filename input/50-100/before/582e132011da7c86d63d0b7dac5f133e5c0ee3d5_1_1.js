function newQuestion() {
    question = Quiz.pick(questions);

    if (question) {
      io.sockets.emit("message", {
        time: +new Date(),
        author: null,
        content: "Nouvelle question."
      });
      io.sockets.emit("question", {
        question: question.question
      });
    } else {
      io.sockets.emit("end of quiz", null);
    }
  }