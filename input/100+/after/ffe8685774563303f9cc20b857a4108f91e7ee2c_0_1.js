function (data) {
        $("#editor-comment").fadeOut(200);
        var commentHtml = '<div class="extra-item">' + data.comment + '</div>';
        if ($("#translator-comment").length) {
          $(commentHtml).hide().prependTo("#translator-comment").delay(200)
                        .animate({height: 'show'}, 1000, 'easeOutQuad');
        } else {
          commentHtml = '<div id="translator-comment">' + commentHtml + '</div>';
          $(commentHtml).prependTo("#extras-container").delay(200)
                        .hide().animate({height: 'show'}, 1000, 'easeOutQuad');
        }
      }