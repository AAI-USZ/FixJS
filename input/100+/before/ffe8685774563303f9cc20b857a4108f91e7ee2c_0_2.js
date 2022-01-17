function (data) {
        var uid = data.uid;

        if (uid == PTL.editor.activeUid) {
          if ($("#translator-comment").length) {
            $(data.entries).hide().appendTo("#translator-comment")
                                            .fadeIn(2000, 'easeOutQuad');
          } else {
            $(data.entries).hide().prependTo("#extras-container")
                                            .fadeIn(2000, 'easeOutQuad');
          }
          $("#hide-timeline").show();
        }
      }