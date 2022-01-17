function(){
    beforeEach(function(){
      this.page.render()
    });

    context("clicking the content", function(){
      it("triggers frame interacted", function(){
        spyOn(this.post.interactions, "fetch").andReturn(new $.Deferred)
        this.page.$('.canvas-frame:first .content').click()
        expect(this.post.interactions.fetch).toHaveBeenCalled()
      })
    })
  }