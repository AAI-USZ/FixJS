function(){   
    if(!this.$el.hasClass('activeOverlay') && this.$el.find('.overlay').html().trim())
    {
      this.$el.find('.overlay').fadeIn(0);
      this.$el.addClass('activeOverlay');
    }
  }