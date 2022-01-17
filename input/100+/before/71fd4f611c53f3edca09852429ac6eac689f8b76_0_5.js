function () {
    var ctxUrl = l('/unit/context/' + PTL.editor.activeUid),
        reqData = {gap: PTL.editor.ctxGap};

    $.ajax({
      url: ctxUrl,
      async: false,
      dataType: 'json',
      data: reqData,
      success: function (data) {
        // As we now have got more context rows, increase its gap
        PTL.editor.ctxGap += 2;

        // Create context rows HTML
        var before = PTL.editor.buildCtxRows(data.ctx.before);
        var after = PTL.editor.buildCtxRows(data.ctx.after);

        // Append context rows to their respective places
        var ctxRows = $("tr.context-row");
        ctxRows.first().before(before);
        ctxRows.last().after(after);
      },
      error: PTL.editor.error
    });
  }