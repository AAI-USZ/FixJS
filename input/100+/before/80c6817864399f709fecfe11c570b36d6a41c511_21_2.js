function(data, callback) {
      var type, version, _base, _base1, _base2, _name, _name1;
      this.log.debug("" + this.constructor.name + " submit");
      type = this.findType(data);
      if ((type != null) && (data.agencyID != null) && (data.id != null)) {
        version = data.version != null ? data.version : '1.0';
        if ((_base = this.cache)[type] == null) {
          _base[type] = {};
        }
        if ((_base1 = this.cache[type])[_name = data.agencyID] == null) {
          _base1[_name] = {};
        }
        if ((_base2 = this.cache[type][data.agencyID])[_name1 = data.id] == null) {
          _base2[_name1] = {};
        }
        this.cache[type][data.agencyID][data.id][version] = data;
      }
      return process.nextTick(callback);
    }