function(ifaces) {
        var iface, phys, _i, _len, _name, _ref;
        phys = {};
        for (_i = 0, _len = ifaces.length; _i < _len; _i++) {
          iface = ifaces[_i];
          if ((_ref = phys[_name = iface.phyid]) == null) phys[_name] = [];
          phys[iface.phyid].push(iface);
        }
        return cb(phys);
      }