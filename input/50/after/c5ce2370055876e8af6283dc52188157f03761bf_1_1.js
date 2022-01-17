function() {
        if (!this.previousContent) {
          this.previousContent = this.originalContent;
        }
        return this.previousContent !== this.getContents();
      }