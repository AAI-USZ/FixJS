function () {
      var $tip = this.tip()
      $tip.find('.tooltip-inner').html(this.getTitle())
      $tip.removeClass('fade in top bottom left right')
    }