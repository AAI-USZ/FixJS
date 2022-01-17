function(){
          spyOn(this.post.interactions, "userLike").andReturn(factory.like());
          this.view.render()
          expect(this.link().attr("class")).toContain("liked")
        }