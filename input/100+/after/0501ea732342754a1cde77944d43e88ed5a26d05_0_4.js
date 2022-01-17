function(request, response) {
  var self = this,
    uri = request.url,
    uriComponents = uri.split("/"),
    paramString = "",
    act = uriComponents[uriComponents.length - 2];



  request.on("data", function(chunk) {
    paramString += chunk.toString();
  });

  request.on("end", function() {
    var params;

    try  {
      self.act(act, JSON.parse(paramString), function(err, res) {
        if(err) {
          self.handleError(err, response);
        }
        else {
          self.doResponse(res, response);
        }
      });
    }
    catch(e) {
      return self.handleError(e, response);
    }

  });
}