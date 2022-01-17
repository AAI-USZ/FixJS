function requestDispatcher(request, response) {
    if (onRequest) {
        onRequest(request, response);
    } else {
        response.writeHead(503);
        response.end("Parasoup starting up");
    }
}