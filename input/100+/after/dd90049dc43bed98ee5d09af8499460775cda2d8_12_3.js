function(){
      beforeEach(function(){
        loginAs({name: "alice"})
        this.post = factory.post()
        this.stream.add(this.post)
        this.stream.deferred.resolve()
        this.page.render()
      });

      describe("clicking fav", function(){
        beforeEach(function(){
          spyOn(this.post, 'toggleFavorite')
          spyOn($.fn, "isotope")
          //this.page.$(".content").click() //stub this out for now
        })

        it("relayouts the page", function(){
          expect($.fn.isotope).toHaveBeenCalledWith("reLayout")
        })

        it("toggles the favorite status on the model", function(){
          expect(this.post.toggleFavorite).toHaveBeenCalled()
        })
      })

      describe("clicking delete", function(){
        beforeEach(function () {
          spyOn(window, "confirm").andReturn(true);
          this.page.render()
        })

        it("kills the model", function(){
          spyOn(this.post, "destroy")
          this.page.$(".canvas-frame:first a.delete").click()
          expect(this.post.destroy).toHaveBeenCalled()
        })

        it("removes the frame", function(){
          spyOn($.fn, "remove").andCallThrough()
          expect(this.page.$(".canvas-frame").length).toBe(1)
          this.page.$(".canvas-frame:first a.delete").click()
          waitsFor(function(){ return $.fn.remove.wasCalled })
          runs(function(){ expect(this.page.$(".canvas-frame").length).toBe(0) })
        })
      })
    }