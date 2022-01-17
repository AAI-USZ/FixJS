function (data) {
        if (data.ctx.before.length || data.ctx.after.length) {
          // As we now have got more context rows, increase its gap
          PTL.editor.ctxGap += PTL.editor.ctxStep;
          $.cookie('ctxQty', PTL.editor.ctxGap, {path: '/'});

          // Create context rows HTML
          var before = PTL.editor.buildCtxRows(data.ctx.before, "before"),
              after = PTL.editor.buildCtxRows(data.ctx.after, "after");

          // Append context rows to their respective places
          var ctxRow = $(".ctx-row"),
              injectCtx = ctxRow.length ? ctxRow : $(".js-inject-ctx");

          injectCtx.first().before(before);
          injectCtx.last().after(after);
        }
      }