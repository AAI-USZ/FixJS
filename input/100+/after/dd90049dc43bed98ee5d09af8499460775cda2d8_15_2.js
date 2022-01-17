function(){
        beforeEach(function(){
          this.view.model.set({user_like : null});
          this.view.render();
        })

        it("the like action should not contain 'liked'", function(){
          expect(this.link().attr("class")).toNotContain("liked")
        })
      }