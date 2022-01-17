function(shouldParseHtml) {
      var compHtml = wysihtml5.lang.string(this.composer.getValue()).trim();
      if (this.firstTime) {
        this.htmlCache = compHtml;
        this.firstTime = false;
      }
      if (compHtml !== this.htmlCache) {
        this.dirty = true;
      	this.textarea.setValue(compHtml, shouldParseHtml);
      	this.editor.fire("change:dirty", compHtml);
      } else {
        this.dirty = false;
      	this.editor.fire("change:clean", compHtml);
      }
    }