function router(request, response, next){
    if (request.method == 'GET') {
      var url = request.pathname === '/' ? '/index.html' : request.pathname;
      response.sendFile(path.join(root, url));
    } else {
      next();
    }
  }