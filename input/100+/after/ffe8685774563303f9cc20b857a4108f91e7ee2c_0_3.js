function (e) {
    e.preventDefault();

    // The results might already be there from earlier:
    if ($("#timeline-results").length) {
      $("#hide-timeline").show();
      $("#timeline-results").animate({height: 'show'}, 1000, 'easeOutQuad');
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
            $(data.entries).appendTo("#translator-comment")
                           .animate({height: 'show'}, 1000, 'easeOutQuad');
          } else {
            $(data.entries).prependTo("#extras-container")
                           .animate({height: 'show'}, 1000, 'easeOutQuad');
          }
          $("#show-timeline").hide();
          $("#hide-timeline").show();
        }
      },
      error: PTL.editor.error
    });
  }