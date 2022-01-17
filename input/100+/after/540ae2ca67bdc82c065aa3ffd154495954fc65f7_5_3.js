function(data) {
      var key, matched, msg, msgs, pattern, res, _i, _len, _ref2, _results;
      msgs = data.toString('ascii').split('\n');
      _results = [];
      for (_i = 0, _len = msgs.length; _i < _len; _i++) {
        msg = msgs[_i];
        if (!(msg.length > 1)) {
          continue;
        }
        matched = false;
        for (key in REAVER_PATTERNS) {
          pattern = REAVER_PATTERNS[key];
          res = pattern.exec(msg);
          if (res) {
            matched = key;
            break;
          }
        }
        switch (matched) {
          case false:
            matched = "unhandled";
            res = [msg];
            break;
          case 'waitingBeacon':
            this.status.foundBeacon = false;
            break;
          case 'newChannel':
            this.status.channel = res[2];
            this.status.associated = false;
            break;
          case 'associated':
            this.status.foundBeacon = true;
            this.status.associated = true;
            break;
          case 'tryingPin':
            this.status.alreadyFailed = false;
            this.status.sequenceDepth = 0;
            if (this.status.pin !== res[1]) {
              this.metrics.totalChecked++;
              this.metrics.consecutiveFailures = 0;
              if (this.status.pin !== null) {
                if (this.status.phase === 0 && this.status.pin.slice(0, 4) === res[1].slice(0, 4)) {
                  this.status.phase = 1;
                  this.emit('completed', 1, {
                    pin: res[1].slice(0, 4)
                  });
                }
              }
              this.status.pin = res[1];
            }
            break;
          case 'sending':
          case 'received':
            if (REAVER_PACKET_SEQ[res[1]] > this.status.sequenceDepth) {
              this.status.sequenceDepth = REAVER_PACKET_SEQ[res[1]];
              this.status.sequenceNew = true;
              this.metrics.maxSeqDepth = Math.max(this.metrics.maxSeqDepth, this.status.sequenceDepth);
            } else {
              this.status.sequenceNew = false;
            }
            break;
          case 'timedOut':
          case 'wpsFailure':
            if (matched === 'timedOut') {
              this.metrics.timeOuts++;
            }
            if (!this.status.alreadyFailed) {
              this.metrics.consecutiveFailures++;
              this.metrics.totalFailures++;
              this.status.alreadyFailed = true;
            }
            break;
          case 'rateLimit':
          case 'associateFailure':
            this.status.associated = false;
            this.status.locked = matched === 'rateLimit';
            this.status.sequenceDepth = -1;
            break;
          case 'consecutiveFailures':
            this.metrics.consecutiveFailures;
            break;
          case 'progress':
            this.metrics.secondsPerPin = (_ref2 = res[4]) != null ? _ref2 : null;
            break;
          case 'crackedPSK':
            this.emit('completed', 2, 'psk', res[1]);
            break;
          case 'crackedPIN':
            this.emit('completed', 2, 'pin', res[1]);
            break;
          case 'crackedTime':
            this.status.phase = 2;
            this.metrics.timeToCrack = res.slice(1, 3).join(' ');
            this.emit('completed', 2, 'time', this.metrics.timeToCrack);
            break;
          case 'crackedSSID':
            this.emit('completed', 2, 'ssid', res[1]);
        }
        _results.push(this.emit('status', matched, this.status, this.metrics, res));
      }
      return _results;
    }