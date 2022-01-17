function(){
    loginAs(factory.user())

    this.model = new factory.statusMessage({frame_name: undefined})
    this.page = new app.pages.Framer({model : this.model});
  }