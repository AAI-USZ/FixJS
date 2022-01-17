function(){
      spyOn(app.router, "navigate")
      this.page.model.trigger("sync")
      expect(app.router.navigate).toHaveBeenCalled()
    }