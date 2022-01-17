function (socket) {
    console.log(socket);
    if (question) {
      io.sockets.emit("question", {
        question: question.question
      });
    }

    socket.on("identification", function (data) {
      socket.set("nickname", data.nickname || "anonymous");
    });

    socket.on("answer", function (request) {
      socket.get("nickname", function (err, nickname) {
        if (err) throw err;

        io.sockets.emit("message", {
          time: +new Date(),
          author: nickname,
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
              content: "La réponse a été trouvée par " + nickname + " ! Soyez prêt, nouvelle question dans " + QUESTIONS_INTERVAL + " secondes."
            });
            setTimeout(newQuestion, QUESTIONS_INTERVAL * 1000);
          }
        }
      });
    });
  }