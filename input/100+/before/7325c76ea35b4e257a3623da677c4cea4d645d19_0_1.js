function(err, cb) {
  var callback = this._callback(cb);
  // log errors instead of posting to airbrake if a dev enviroment
  if (this.developmentEnvironments.indexOf(this.env) != -1) {
    this.log(err);
    return callback();
  }

  var body = this.notifyXml(err);

  var options = {
    method: 'POST',
    url: this.url('/notifier_api/v2/notices'),
    body: body,
    timeout: this.timeout,
    headers: {
      'Content-Length': body.length,
      'Content-Type': 'text/xml',
    },
  };

  request(options, function(err, res, body) {
    if (err) {
      return callback(err);
    }

    if (res.statusCode >= 300) {
      var status = HTTP_STATUS_CODES[res.statusCode];

      var explanation = body.match(/<error>([^<]+)/i);
      explanation = (explanation)
        ? ': ' + explanation[1]
        : ': ' + body;

      return callback(new Error(
        'Notification failed: ' + res.statusCode + ' ' + status + explanation
      ));
    }

    // Give me a break, this is legit : )
    var m = body.match(/<url>([^<]+)/i);
    var url = (m)
      ? m[1]
      : null;

    callback(null, url);
  });
}