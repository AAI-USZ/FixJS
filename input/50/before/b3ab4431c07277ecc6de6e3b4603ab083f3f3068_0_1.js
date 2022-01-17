function(color) {
      if (typeof color == 'string')
        return this.color = color

      var $t = $(color.currentTarget)
      this.color = $t.data('color')
      return true;
    }