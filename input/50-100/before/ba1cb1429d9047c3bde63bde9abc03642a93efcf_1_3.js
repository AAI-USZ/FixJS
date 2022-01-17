function (element, suggestion) {
        event.go = true;
        if (!$hint.html()) {
          var suggestion = 'Did you mean <a href="#" id="suggested_email" class="suggested_email">' + suggestion.full + "</a>?" +
            "<br/>Click the '" + $("#sign_petition").val() + "' button again if your address is correct";
          $hint.html(suggestion).fadeIn(150);
          event.go = false;
        }
      }