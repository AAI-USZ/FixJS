function(evt) {
    evt && evt.preventDefault()
    app.router.navigate(this.model.url() + '/remix', {trigger : true})
  }