function (data) {
        var uid = data.uid;

        if (data.entries) {
          if (uid == PTL.editor.activeUid) {
            if ($("#translator-comment").length) {
              $(data.entries).appendTo("#translator-comment")
                             .animate({height: 'show'}, 1000, 'easeOutQuad');
            } else {
              $(data.entries).prependTo("#extras-container")
                             .animate({height: 'show'}, 1000, 'easeOutQuad');
            }
            $("#show-timeline").hide();
            $("#hide-timeline").show();
          }
        }
      }