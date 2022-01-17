function(request, response) {
    if (handleInvalidContentType(request, response)) return;
    if (handleInvalidContentLength(request, response)) return;

    var batches = request.body;
    var domain = new Domain(request);
    var processor = new BatchProcessor({
          context: context,
          domain: domain
        });

    try {
      processor.validate(batches);
    } catch(error) {
      return response.send(JSON.stringify(error.result));
    }

    processor.load(batches)
      .next(function(result) {
        response.send(JSON.stringify(result));
      })
      .error(function(error) {
        response.send(error.message + '\n' + error.stack, 502);
      });
  }