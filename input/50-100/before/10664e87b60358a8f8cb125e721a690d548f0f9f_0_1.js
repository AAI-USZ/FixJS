function(event) {
        var $this = $(this);
        var options = $this.data('alchemy-overlay');
        event.preventDefault();
        Alchemy.openWindow($this.attr('href'), options.title, options.size_x, options.size_y, options.resizable, options.overflow);
        return false;
      }