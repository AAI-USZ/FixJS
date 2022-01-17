function (socket) {
    io.sockets.emit("question", {
      id: question.id,
      question: question.question
    });

    socket.on("answer", function (request) {
      if (question) {
        if (question.check(request.answer)) {
          socket.emit("good answer", {
            id: question.id,
            question: question.question,
            answer: request.answer,
            possible_answers: question.answers
          });

          newQuestion();
        }
      }
    });
  }