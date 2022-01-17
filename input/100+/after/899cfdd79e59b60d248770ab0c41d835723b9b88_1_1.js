function(label, res) {
    if (res instanceof Result) {
      this._simple_logging(label, res);
      return;
    }
    var countSuccess = 0,
        countFailed = 0,
        keys = Object.keys(res),
        last_index = this.logBuffer.length - 1,
        i, l, key, r, log, suite_label, c, prefix;
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      r = res[key];
      if (r.success) {
        countSuccess++;
        c = ANSI_COLOR.GREEN;
      } else {
        countFailed++;
        c = ANSI_COLOR.RED;
      }
      log = this._simple_logging(key, r);
      this.logBuffer[last_index + i + 1] = '  ' +
        wrapColor(log.replace(/\n/g, '\n    '), c);
    }
    if (countFailed) {
      suite_label = wrapColor(
          MARK_CHAR.CLOUD + ' ' + label +
          ': failed ' + countFailed + ' case',
          ANSI_COLOR.YELLOW);
    } else {
      suite_label = wrapColor(
          MARK_CHAR.SUN + ' ' + label +
          ': passed ' + countSuccess + ' case',
          ANSI_COLOR.GREEN);
    }
    this.logBuffer.splice(last_index + 1, 0, suite_label);
  }