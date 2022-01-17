function (err) {
        if (err) {
          if (_self.logFunc) {
            _self.logFunc(JSON.stringify({
              'addr' : one.addr,
              'err'  : err
            }));
          }
        } else {
          tmp.push(one.addr);
        }

        if (--count === 0) {
          if (!tools.isDiff(_self.available, preAvail) && tools.isDiff(_self.available, tmp) && tmp != 0){
            if (_self.checkTimes >= CONSTANTS.HEARTBEAT_CHECK_TIMES) {
              _self.available = tools.objectClone(tmp);
              _self.checkTimes = 0;
              _self.emit('update', _self.getServiceAll());
            } else {
              _self.checkTimes++;
            }
          }
          _self.afterHeartbeat();
        }
      }