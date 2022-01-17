function (e) {
    e.preventDefault();

    // The results might already be there from earlier:
    if ($("#timeline-results").length) {
      $("#hide-timeline").show();
      $("#timeline-results").show();
      $("#show-timeline").hide();
      return;
    }

    var uid = PTL.editor.activeUid,
        timelineUrl = l("/unit/timeline/" + uid);

    // Always abort previous requests so we only get results for the
    // current unit
    if (PTL.editor.timelineReq != null) {
      PTL.editor.timelineReq.abort();
    }

    PTL.editor.timelineReq = $.ajax({
      url: timelineUrl,
      dataType: 'json',
      success: function (data) {
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
      },
      error: PTL.editor.error
    });
  }