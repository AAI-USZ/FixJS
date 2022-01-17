function(response) {
    // parse internal models
    if (response.ok === undefined) {
      for (var key in this.model) {
        var embeddedClass = this.model[key];
        var embeddedData = response[key];
        response[key] = new embeddedClass(embeddedData, {parse:true});
      }
    }
  
    // adjust rev
    if (response.rev) {
      response._rev = response.rev;
      delete response.rev;
    }
  
    // adjust id
    if (response.id) {
      response._id = response.id;
      delete response.id;
    }
  
    // remove ok
    delete response.ok;
  
    return response;
  }