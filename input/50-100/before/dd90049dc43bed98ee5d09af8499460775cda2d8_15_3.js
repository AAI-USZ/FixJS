function(){
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
      }