function (data) {
        if (data.ctx.before.length || data.ctx.after.length) {
          // As we now have got more context rows, increase its gap
          PTL.editor.ctxGap += PTL.editor.ctxStep;

          // Create context rows HTML
          var before = PTL.editor.buildCtxRows(data.ctx.before, "before"),
              after = PTL.editor.buildCtxRows(data.ctx.after, "after");

          // Append context rows to their respective places
          var editCtxRows = $("tr.edit-ctx");
          editCtxRows.first().after(before);
          editCtxRows.last().before(after);
        }
      }