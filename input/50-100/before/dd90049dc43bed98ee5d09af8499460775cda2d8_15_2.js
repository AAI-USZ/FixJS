function(){
          spyOn(this.post.interactions, "userLike").andReturn(factory.like());
          this.view.render()
          expect(this.link().text()).toContain(Diaspora.I18n.t('stream.unlike'))
        }