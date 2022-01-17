function(shouldParseHtml) {
      this.textarea.setValue(wysihtml5.lang.string(this.composer.getValue()).trim(), shouldParseHtml);
    }