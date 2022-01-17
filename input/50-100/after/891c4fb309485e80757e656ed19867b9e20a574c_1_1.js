function checkConnected(_request, _response, _next) {
  if (_request.url === '/') {
    _next();
  } else if (_request.session && _request.session.connected) {
    _next();
  } else {
    _response.send(new Error('not_connected'), 599);
  };
}