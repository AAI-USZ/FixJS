function(attrs) {
      var _base, _name;
      if ((_base = seriesCur.obs.attributes)[_name = attrs.id] == null) {
        _base[_name] = [];
      }
      return seriesCur.obs.attributes[attrs.id].push(attrs.value);
    }