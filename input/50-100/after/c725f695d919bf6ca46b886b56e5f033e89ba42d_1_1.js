function (request) {
    // TODO: need some sort of templating support here
    var boundaryText = request.boundary ? ("<br/>" + request.boundary) : "";

    var parsedDate = new Date(request.requested_datetime);

    return "<h2>" + request.service_name + "</h2>" + 
          "<h4>Address</h4><p>" + request.address + boundaryText + "</p>" +
          "<h4>Description</h4><p>" + request.description + "</p>" +
          "<h4>Created</h4><p>" + dateTools.formatDate(parsedDate)+
          " - <span class='ago'>"+dateTools.timeSpanString(parsedDate) + " ago</span></p>" +
          (request.status === "closed" ? "<h5>CLOSED</h5>" : "");
  }