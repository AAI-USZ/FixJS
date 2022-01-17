function insert_token(id, value) {
      var this_token = $("<li><p>"+ $('<a/>').text(value).html() +"</p> </li>")
      .addClass(settings.classes.token)
      .insertBefore(input_token);

      // The 'delete token' button
      $("<span>x</span>")
          .addClass(settings.classes.tokenDelete)
          .appendTo(this_token)
          .click(function () {
              delete_token($(this).parent());
              return false;
          });

      $.data(this_token.get(0), "tokeninput", {"id": id, "name": value});

      return this_token;
    }