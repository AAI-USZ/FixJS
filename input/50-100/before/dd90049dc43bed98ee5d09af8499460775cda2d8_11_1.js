function(){
    loginAs(factory.user())
    app.frame = new factory.statusMessage({frame_name: undefined});

    this.page = new app.pages.Framer();
    this.model = this.page.model
    expect(this.model).toBe(app.frame) //uses global state of app.frame :/
  }