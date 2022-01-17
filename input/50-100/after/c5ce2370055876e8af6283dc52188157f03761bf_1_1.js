function(indicator) {
        var offset;
        indicator.css('position', 'absolute');
        offset = this.element.position();
        indicator.css('top', offset.top + 2);
        return indicator.css('left', offset.left + 2);
      }