function(){
      spyOn(this.model, 'setFrameName')
      this.model.unset("frame_name")
      new app.pages.Framer({model : this.model})
      expect(this.model.setFrameName).toHaveBeenCalled()
    }