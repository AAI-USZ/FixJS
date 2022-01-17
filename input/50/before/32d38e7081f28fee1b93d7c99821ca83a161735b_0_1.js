function Device() {
      _.extend(this, Backbone.Events);
      $window.on('orientationchange', _.bind(this.trigger, this, 'orientationchange'));
    }