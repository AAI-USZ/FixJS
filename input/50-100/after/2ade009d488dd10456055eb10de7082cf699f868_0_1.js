function log(params, severity) {
    if (typeof severity === 'number') {
      params.severity = severity;
    }
    var message = this.formatter.format(params);

    if (severity >= 3) {
      // Map cef severity of 3..10 to syslog severity of 7..0
      var syslogSeverity = 7 - (severity - 3);
      this.syslog.log(message, syslogSeverity);
    }

    return message;
  }