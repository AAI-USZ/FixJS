function(){
    this.model = this.model || new app.models.StatusMessage
    this.model.photos = this.model.photos || new Backbone.Collection()

    if(!this.model.get("frame_name")) { this.model.setFrameName() }

    this.model.authorIsCurrentUser = function(){ return true }
    this.model.bind("sync", this.navigateNext, this)

    this.initViews()
  }