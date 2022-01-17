function () {
    var ctxUrl = l('/unit/context/' + PTL.editor.activeUid),
        reqData = {gap: PTL.editor.ctxGap, qty: PTL.editor.ctxStep};

    $.ajax({
      url: ctxUrl,
      async: false,
      dataType: 'json',
      data: reqData,
      success: function (data) {
        if (data.ctx.before.length || data.ctx.after.length) {
          // As we now have got more context rows, increase its gap
          PTL.editor.ctxGap += PTL.editor.ctxStep;
          $.cookie('ctxQty', PTL.editor.ctxGap, {path: '/'});

          // Create context rows HTML
          var before = PTL.editor.buildCtxRows(data.ctx.before, "before"),
              after = PTL.editor.buildCtxRows(data.ctx.after, "after");

          // Append context rows to their respective places
          var editCtxRows = $("tr.edit-ctx");
          editCtxRows.first().after(before);
          editCtxRows.last().before(after);
        }
      },
      error: PTL.editor.error
    });
  }