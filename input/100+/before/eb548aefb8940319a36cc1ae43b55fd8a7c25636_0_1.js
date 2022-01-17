function () {
      var self = this;

      this.$wrapper.append(this.directionalNavHTML);
      
      this.$wrapper.find('.left').click(function () { 
        self.stopClock();
        self.$element.trigger('orbit.prev');
      });
      
      this.$wrapper.find('.right').click(function () {
        self.stopClock();
        self.$element.trigger('orbit.next');
      });
    }