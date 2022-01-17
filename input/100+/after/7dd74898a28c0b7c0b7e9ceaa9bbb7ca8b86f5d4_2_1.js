function() {
      if (that.model.jekyll) {
        that.metadataEditor = CodeMirror($('#raw_metadata')[0], {
          mode: 'yaml',
          value: that.model.raw_metadata,
          theme: 'prose-dark',
          lineWrapping: true,
          lineNumbers: true,
          extraKeys: that.keyMap(),
          onChange: _.bind(that._makeDirty, that)
        });
        $('#post .metadata').hide();
      }
      that.editor = CodeMirror($('#code')[0], {
        mode: that.model.lang,
        value: that.model.content,
        lineWrapping: true,
        lineNumbers: true,
        extraKeys: that.keyMap(),
        matchBrackets: true,
        theme: 'prose-bright',
        onChange: _.bind(that._makeDirty, that)
      });
      that.refreshCodeMirror();
    }