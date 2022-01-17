function(){
        loginAs(this.post.get("author"))
        this.view.render();
        spyOn(this.post.interactions, "toggleLike");
        this.link().click();
        expect(this.post.interactions.toggleLike).toHaveBeenCalled();
      }