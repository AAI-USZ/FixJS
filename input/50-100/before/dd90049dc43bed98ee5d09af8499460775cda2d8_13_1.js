function(){
    it("sets the background-image of #header", function(){
      this.page.render()
      expect(this.page.$('#header').css('background-image')).toBeTruthy()
    })
  }