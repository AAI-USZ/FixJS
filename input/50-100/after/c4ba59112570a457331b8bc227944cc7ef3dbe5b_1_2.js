function (socket) {
    if (question) {
      io.sockets.emit("question", {
        question: question.question
      });
    }

    socket.on("answer", function (request) {
      if (question) {
        if (question.check(request.answer)) {
          socket.emit("good answer", {
            question: question.question,
            answer: request.answer,
            possible_answers: question.answers
          });
          newQuestion();
        }
      }
    });
  }