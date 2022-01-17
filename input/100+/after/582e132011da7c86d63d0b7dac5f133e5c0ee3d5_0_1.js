function chatboxAppend(message) {
      var d = new Date(message.time)
        , date_formatted = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        , el_container = document.createElement("div")
        , el_date      = document.createElement("span")
        , el_author    = document.createElement("span")
        , el_content   = document.createElement("span");

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
      el_container.appendChild(el_author);
      el_container.appendChild(el_content);

      div_chatbox.appendChild(el_container);

      if (div_chatbox.childNodes.length > CHATBOX_MAX_MESSAGES) {
        div_chatbox.removeChild(div_chatbox.firstChild);
      }
    }