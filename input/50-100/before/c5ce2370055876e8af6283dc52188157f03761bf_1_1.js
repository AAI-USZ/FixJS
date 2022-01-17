function(indicator) {
        var offset;
        indicator.css('position', 'absolute');
        offset = this.element.offset();
        indicator.css('top', offset.top + 2);
        return indicator.css('left', offset.left + 2);
      }