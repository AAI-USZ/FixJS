function(response) {
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