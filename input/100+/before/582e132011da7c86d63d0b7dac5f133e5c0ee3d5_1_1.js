function (request) {
      io.sockets.emit("message", {
        time: +new Date(),
        author: "author",
        content: request.answer
      });
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
    }