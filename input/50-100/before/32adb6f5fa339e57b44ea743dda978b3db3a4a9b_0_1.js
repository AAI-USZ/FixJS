function(){  
    var model = this.model;
    this.lightboxView = new LightboxView({model : model});
    this.lightboxView.show();
  }