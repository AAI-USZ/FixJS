function(){
        loginAs({name: "alice"})
        this.post = factory.post()
        this.stream.add(this.post)
        this.stream.deferred.resolve()
        this.page.render()
      }