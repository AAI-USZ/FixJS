function(){
      spyOn(app.frame, "save");
      this.page.$("input.done").click();
      expect(app.frame.save).toHaveBeenCalled();
    }