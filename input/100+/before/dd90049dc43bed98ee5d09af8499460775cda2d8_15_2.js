function(){
      it("calls 'toggleLike' on the target post", function(){
        loginAs(this.post.interactions.likes.models[0].get("author"))
        this.view.render();
        spyOn(this.post.interactions, "toggleLike");
        this.link().click();
        expect(this.post.interactions.toggleLike).toHaveBeenCalled();
      })

      context("when the user likes the post", function(){
        it("the like action should be 'Unlike'", function(){
          spyOn(this.post.interactions, "userLike").andReturn(factory.like());
          this.view.render()
          expect(this.link().text()).toContain(Diaspora.I18n.t('stream.unlike'))
        })
      })


      context("when the user doesn't yet like the post", function(){
        beforeEach(function(){
          this.view.model.set({user_like : null});
          this.view.render();
        })

        it("the like action should be 'Like'", function(){
          expect(this.link().text()).toContain(Diaspora.I18n.t('stream.like'))
        })

        it("allows for unliking a just-liked post", function(){
          // callback stuff.... we should fix this

          // expect(this.link().text()).toContain(Diaspora.I18n.t('stream.like'))

          // this.link().click();
          // expect(this.link().text()).toContain(Diaspora.I18n.t('stream.unlike'))

          // this.link().click();
          // expect(this.link().text()).toContain(Diaspora.I18n.t('stream.like'))
        })
      })
    }