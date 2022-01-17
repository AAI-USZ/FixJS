function () {
  "use strict";

  // Note: Temporary using those shims while we don't use any JS lib yet.
  function addListener(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback, false);
    } else if (target.attachEvent) {
      target.attachEvent("on" + type, callback);
    } else {
      throw new Error("Neither addEventListener nor attachEvent exists on '" + target + "'.");
    }
  }
  (function () {
    addListener(window, "load", function () {
      var textAttr;

      if (typeof(document.body.textContent) !== "undefined") {
        textAttr = "textContent";
      } else if (typeof(document.body.innerText) !== "undefined") {
        textAttr = "innerText";
      } else {
        throw new Error("Neither textContent nor innerText exists.");
      }

      Element.prototype.text = function(val) {
        if (arguments.length === 0) {
          return this[textAttr];
        }
        this[textAttr] = val;
      };
    });
  }());

  var socket = io.connect(window.location.href);

  addListener(window, "load", function () {
    var input_message = document.querySelector("input.message")
      , btn_send_message = document.querySelector("button.send-message")
      , div_question_display = document.querySelector("div.question-display")
      , div_chatbox = document.querySelector("div.chatbox");

    socket.on("question", function (data) {
      console.log("question: ", data.question);
      div_question_display.text(data.question);
    });

    socket.on("message", function (message) {
      console.log("message: ", message.time + " — " + message.author + " – " + message.content);
      chatboxAppend(message);
    });

    socket.on("good answer", function (question) {
      console.log("good answer");
      console.log("Question → " + question.question);
      console.log("Expected → " + question.possible_answers);
      console.log("Given    → " + question.answer);
      chatboxAppend({
        time: +new Date(),
        author: null,
        content: "Bravo, vous avez trouvé la bonne réponse !"
      });
    });

    socket.on("end of quiz", function () {
      console.log("end of quiz");
      div_question_display.innerHTML = '<em style="opacity: 0.5">Le quiz est terminé.</em>';
    });

    function send() {
      var val = input_message.value.trim();

      if (val) {
        send_answer(input_message.value);
        input_message.value = "";
      }
    }

    function send_answer(answer) {
      socket.emit("answer", {
        answer: answer
      });
    }

    function chatboxAppend(message) {
      var d = new Date(message.time)
        , date_formatted = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        , el_container = document.createElement("div")
        , el_date      = document.createElement("span")
        , el_author    = document.createElement("span")
        , el_content   = document.createElement("span");

      function getSeparator() {
        return document.createTextNode(" — ");
      }

      el_container.className = "chatbox-message";
      el_date.className      = "chatbox-date";
      el_author.className    = "chatbox-author";
      el_content.className   = "chatbox-content";

      if (!message.author) {
        el_container.className += " chatbox-info-message";
      }

      el_date.text(date_formatted);
      el_author.text(message.author || "Quiz");
      el_content.text(message.content);

      el_container.appendChild(el_date);
      el_container.appendChild(getSeparator());
      el_container.appendChild(el_author);
      el_container.appendChild(getSeparator());
      el_container.appendChild(el_content);

      div_chatbox.appendChild(el_container);
    }

    input_message.focus();
    addListener(input_message, "keyup", function (e) {
      if (e.keyCode === 13) {
        send(e);
      }
    });

    addListener(btn_send_message, "click", send);
  });
}