function render() {
      if (!initialized) { return; }
      var visible = getVisibleRange();
      var rendered = getRenderedRange();

      // remove rows no longer in the viewport
      cleanupRows(rendered);

      // add new rows
      renderRows(rendered);
      // add frozen rows
      if(options.frozenRow > 0)
      renderRows({top:0,bottom:options.frozenRow - 1});

      postProcessFromRow = visible.top;
      postProcessToRow = Math.min(options.enableAddRow ? getDataLength() : getDataLength() - 1, visible.bottom);
      startPostProcessing();

      lastRenderedScrollTop = scrollTop;
      h_render = null;
    }