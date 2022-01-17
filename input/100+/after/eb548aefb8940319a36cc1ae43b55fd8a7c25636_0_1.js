function () {
      var self = this,
          $directionalNav = $(this.directionalNavHTML);
      
      $directionalNav.find('.right').html(this.options.directionalNavRightText);
      $directionalNav.find('.left').html(this.options.directionalNavLeftText);

      this.$wrapper.append($directionalNav);
      
      this.$wrapper.find('.left').click(function () { 
        self.stopClock();
        self.$element.trigger('orbit.prev');
      });
      
      this.$wrapper.find('.right').click(function () {
        self.stopClock();
        self.$element.trigger('orbit.next');
      });
    }