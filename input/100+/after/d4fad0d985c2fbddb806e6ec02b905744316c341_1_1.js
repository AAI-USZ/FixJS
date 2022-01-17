function() {
        var range;
        range = this.getSelection();
        return this.element.has(range.startContainer).length > 0;
      }