function (question) {
      console.log("good answer");
      console.log("Question → " + question.question);
      console.log("Expected → " + question.possible_answers);
      console.log("Given    → " + question.answer);
      chatboxAppend({
        time: +new Date(),
        author: null,
        content: "Bravo, vous avez trouvé la bonne réponse !"
      });
    }