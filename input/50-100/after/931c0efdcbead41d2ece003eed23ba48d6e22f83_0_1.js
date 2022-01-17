function(done) {
    var self = this;
    this.isOpen = false;

    this.$el.animate({
      margin: "-10px 0 0 0",
      opacity: 0
    },this.options.speedOut, function(){
      // Remove selected class
      $(self.options.target).removeClass("selected");
      // And hide it
      self.$el.hide();
      done && done();
    });
  }