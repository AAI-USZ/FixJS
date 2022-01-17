function(){
        this.post = factory.post()
        this.stream.add(this.post)
        this.stream.deferred.resolve()
        this.page.toggleEdit()
        expect(this.page.editMode).toBeTruthy()
        this.page.render()
      }