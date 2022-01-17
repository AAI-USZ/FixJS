function(){
          spyOn(this.post, 'toggleFavorite')
          spyOn($.fn, "isotope")
          this.page.$(".content").click()
        }