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
          question = null;
          io.sockets.emit("end of question", null);
          io.sockets.emit("message", {
            time: +new Date(),
            author: null,
            content: "La réponse a été trouvée ! Soyez prêt, nouvelle question dans " + QUESTIONS_INTERVAL + " secondes."
          });
          setTimeout(newQuestion, QUESTIONS_INTERVAL * 1000);
        }
      }
    }