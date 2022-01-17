function(ifaces) {
        var iface, phys, pi, _i, _len, _ref, _ref2;
        phys = {};
        for (_i = 0, _len = ifaces.length; _i < _len; _i++) {
          iface = ifaces[_i];
          if (((_ref = iface.driver) != null ? _ref.length : void 0) != null) {
            pi = iface.driver[1].slice(1, -1);
            if ((_ref2 = phys[pi]) == null) phys[pi] = [];
            phys[pi].push(iface);
          }
        }
        return cb(phys);
      }