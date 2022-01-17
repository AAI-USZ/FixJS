function (data) {
        $("#editor-comment").fadeOut(200);
        var commentHtml = '<div class="extra-item">' + data.comment + '</div>';
        $(commentHtml).hide().prependTo("#translator-comment").delay(200)
                      .fadeIn(2000);
      }