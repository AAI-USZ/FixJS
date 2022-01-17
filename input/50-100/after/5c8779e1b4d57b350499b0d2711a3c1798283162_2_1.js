function() {
      this.element.html("");
      this.element.removeClass('wordmatch-container ui-widget-content');
      this.element.css(this._savedCSS);
      return jQuery('body').unbind('keyup', this._escHandler);
    }