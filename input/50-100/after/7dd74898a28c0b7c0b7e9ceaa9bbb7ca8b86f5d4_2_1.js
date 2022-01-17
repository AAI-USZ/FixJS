function() {
    if ($('.toggle.meta').hasClass('active')) {
      $('.CodeMirror-scroll').height($('.document').height() / 2);
    } else {
      $('.CodeMirror-scroll').height($('.document').height());
    }
    this.editor.refresh();
    if (this.metadataEditor) this.metadataEditor.refresh();
  }