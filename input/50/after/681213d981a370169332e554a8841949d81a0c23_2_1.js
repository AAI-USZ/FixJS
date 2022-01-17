function(e) {
        $('#nb_messages').text(e || "0").toggleClass("unread", e > 0);
      }