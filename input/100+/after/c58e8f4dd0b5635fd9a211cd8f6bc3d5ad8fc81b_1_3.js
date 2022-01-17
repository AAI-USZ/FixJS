function (quiz) {
  var questions = Quiz.getQuestions(quiz)
    , question;

  app.listen(port);
  console.log("Server started");
  console.log("   - port: " + port);
  console.log("   - working directory: " + process.cwd());

  pickQuestion();
  io.sockets.on("connection", function (socket) {
    console.log(socket);
    if (question) {
      emitQuestion();
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

            var content = "La réponse a été trouvée par " + nickname + " ! " + (question.answers.length > 1 ? "Les réponses possibles étaient : " : "La réponse était : ") + "« " + question.answers.join(", ") + " »."
            question = null;
            io.sockets.emit("end of question", null);
            pickQuestion();

            if (question) {
              content += " Soyez prêt, nouvelle question dans " + QUESTIONS_INTERVAL + " secondes.";
              setTimeout(emitQuestion, QUESTIONS_INTERVAL * 1000);
            } else {
              io.sockets.emit("end of quiz", null);
            }

            io.sockets.emit("message", {
              time: +new Date(),
              author: null,
              content: content
            });
          }
        }
      });
    });
  });
  function pickQuestion() {
    question = Quiz.pick(questions);
  }

  function emitQuestion() {
    io.sockets.emit("question", {
      question: question.question
    });
  }
}