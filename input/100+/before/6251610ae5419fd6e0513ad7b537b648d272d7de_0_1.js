function(start, end, dostuff, done) {
  var directionsApiUrl = util.format('http://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&sensor=false', start, end);
  console.log(directionsApiUrl);
  request(directionsApiUrl, function (error, response, body) {
    // TODO error handling
    if (!error && response.statusCode == 200) {
      var bodyObj = JSON.parse(body);
      var routes = bodyObj.routes;
      var legs = routes[0].legs;
      var steps = legs[0].steps;

      async.forEachSeries(steps, function(step, callback) {
         var points = step.polyline.points;
         var decodedPoints = walker.decodeLine(points);

         async.forEachSeries(decodedPoints, function(point, callback2) {
            dostuff({lat: point[0], lng: point[1]}, callback2);
         }, callback);
      }, done);
    }
  });
}