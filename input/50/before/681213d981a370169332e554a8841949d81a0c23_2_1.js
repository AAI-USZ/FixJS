function(e) {
        var $tag = $('#nb_messages');
        $tag.text(e || "0").toggleClass("unread", e > 0);
      }