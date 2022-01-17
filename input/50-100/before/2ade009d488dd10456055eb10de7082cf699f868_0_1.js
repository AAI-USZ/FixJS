function log(params, severity) {
    if (typeof severity === 'number') {
      params.severity = severity;
    }
    var message = this.formatter.format(params);

    if (severity >= 3) {
      // Map cef severity of 3..10 to syslog severity of 0..7
      var syslogSeverity = severity - 3;
      this.syslog.send(message, syslogSeverity);
    }

    return message;
  }