function(){
      beforeEach(function(){
        this.post.attributes.public = true;
        this.view.render();
      })

      it("shows 'Public'", function(){
        expect($(this.view.el).html()).toContain(Diaspora.I18n.t('stream.public'))
      })

      it("shows a reshare_action link", function(){
        expect(this.view.$("a.reshare")).toExist()
      });

      it("does not show a reshare_action link if the original post has been deleted", function(){
        this.post.set({post_type : "Reshare", parent : null})
        this.view.render();
        expect(this.view.$("a.reshare")).not.toExist()
      })
    }