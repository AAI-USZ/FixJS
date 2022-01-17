function() {
      var replacement = this.settings.htmlDiv || this.textArea;
      this.commit();
      
      this.container.replaceWith(replacement);
      replacement.removeClass('preview').unbind()
        .attr('contentEditable',false).show()
        .markupEditor('prepare', this.settings);
    }