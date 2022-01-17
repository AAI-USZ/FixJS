function(){  
    var model = this.model;
    this.lightboxView = new LightboxView({model : model});
    $('#lightbox').append(this.lightboxView.render().el);
    this.lightboxView.show();
    this.$el.removeClass('visible');
  }