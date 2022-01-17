function(){
      spyOn(this.model, "save");
      this.page.$("input.done").click();
      expect(this.model.save).toHaveBeenCalled();
    }