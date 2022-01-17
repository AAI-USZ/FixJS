function() {
      var html = textileCompiler.compile(this.textArea.val());
      this.htmlDiv.html(html);
    }