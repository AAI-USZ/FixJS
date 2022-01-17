function() {
      this.element.html("");
      this.element.removeClass('sizedetect-container');
      this.element.css(this._savedCSS);
      return jQuery('body').unbind('keyup', this._escHandler);
    }