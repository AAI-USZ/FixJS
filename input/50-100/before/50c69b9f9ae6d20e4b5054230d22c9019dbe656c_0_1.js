function(event) {
    var query = this.$(event.target).find("#search").val()
    if(!(CATARSE.loader.namespace.text == "" && CATARSE.loader.controller == "explore" && CATARSE.loader.action == "index") && query.length > 0)       
      location.href = "/explore#search/" + query
    return false
  }