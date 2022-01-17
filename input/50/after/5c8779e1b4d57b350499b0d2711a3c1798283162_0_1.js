function() {
      this.element.html("");
      this.element.removeClass('sizedetect-container ui-widget-content');
      this.element.css(this._savedCSS);
      return jQuery('body').unbind('keyup', this._escHandler);
    }