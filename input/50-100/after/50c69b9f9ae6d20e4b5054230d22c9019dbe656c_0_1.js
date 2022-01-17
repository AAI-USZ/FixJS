function(event) {
    var query = this.$(event.target).find("#search").val()
    if(!($('#main_content').data("controller-name") == "explore" && $('#main_content').data("action") == "index") && query.length > 0)
      location.href = "/explore#search/" + query
    return false
  }