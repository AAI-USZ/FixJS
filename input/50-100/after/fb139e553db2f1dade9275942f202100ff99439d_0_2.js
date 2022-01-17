function () {

    var before = $(".ctx-row.before"),
        after = $(".ctx-row.after");

    // Make sure there are context rows before decreasing the gap and
    // removing any context rows
    if (before.length || after.length) {
      PTL.editor.ctxGap -= PTL.editor.ctxStep;
      $.cookie('ctxQty', PTL.editor.ctxGap, {path: '/'});

      before.slice(0, PTL.editor.ctxStep).remove();
      after.slice(-PTL.editor.ctxStep).remove();
    }
  }