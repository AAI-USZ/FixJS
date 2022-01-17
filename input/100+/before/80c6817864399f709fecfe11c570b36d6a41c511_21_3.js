function() {

    SimpleRegistry.name = 'SimpleRegistry';

    function SimpleRegistry(log) {
      this.log = log;
      this.cache = {};
    }

    SimpleRegistry.prototype.query = function(type, ref, resolveRefs, callback) {
      var results;
      this.log.debug("" + this.constructor.name + " query");
      results = {};
      addToQueryResults(type, queryCache(type, ref, this.cache), results);
      if (resolveRefs) {
        resolveReferences(type, ref, this.cache, results);
      }
      return process.nextTick((function() {
        return callback(null, results);
      }));
    };

    SimpleRegistry.prototype.match = function(type, data, callback) {
      var agencyId, dsd, id, ids, version, versions, _ref;
      this.log.debug("" + this.constructor.name + " match");
      _ref = this.cache[sdmx.DATA_STRUCTURE_DEFINITION];
      for (agencyId in _ref) {
        ids = _ref[agencyId];
        for (id in ids) {
          versions = ids[id];
          for (version in versions) {
            dsd = versions[version];
            if (this.matchComponentsToDSD(type, data, dsd)) {
              process.nextTick((function() {
                return callback(null, dsd);
              }));
              return;
            }
          }
        }
      }
      return process.nextTick(callback);
    };

    SimpleRegistry.prototype.submit = function(data, callback) {
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
    };

    SimpleRegistry.prototype.findType = function(data) {
      if (data.codes != null) {
        return sdmx.CODE_LIST;
      }
      if (data.concepts != null) {
        return sdmx.CONCEPT_SCHEME;
      }
      if (data.dimensionDescriptor != null) {
        return sdmx.DATA_STRUCTURE_DEFINITION;
      }
      return null;
    };

    SimpleRegistry.prototype.matchComponentsToDSD = function(type, data, dsd) {
      var isAttribute, isDimension, isMeasure, key, value, _ref, _ref1, _ref2, _ref3, _ref4;
      if (data.components != null) {
        _ref = data.components;
        for (key in _ref) {
          value = _ref[key];
          isDimension = dsd.dimensionDescriptor[key] != null;
          isAttribute = dsd.attributeDescriptor[key] != null;
          isMeasure = dsd.measureDescriptor.primaryMeasure.id === key;
          if (!(isDimension || isAttribute || isMeasure)) {
            return false;
          }
        }
        return true;
      }
      if (type === sdmx.SERIES) {
        _ref1 = data.seriesKey;
        for (key in _ref1) {
          value = _ref1[key];
          if (dsd.dimensionDescriptor[key] == null) {
            return false;
          }
        }
        _ref2 = data.attributes;
        for (key in _ref2) {
          value = _ref2[key];
          if (dsd.attributeDescriptor[key] == null) {
            return false;
          }
        }
      }
      if (type === sdmx.ATTRIBUTE_GROUP) {
        _ref3 = data.groupKey;
        for (key in _ref3) {
          value = _ref3[key];
          if (dsd.dimensionDescriptor[key] == null) {
            return false;
          }
        }
        _ref4 = data.attributes;
        for (key in _ref4) {
          value = _ref4[key];
          if (dsd.attributeDescriptor[key] == null) {
            return false;
          }
        }
      }
      if (type === sdmx.DATA_SET_ATTRIBUTES) {
        for (key in data) {
          value = data[key];
          if (dsd.attributeDescriptor[key] == null) {
            return false;
          }
        }
      }
      return true;
    };

    return SimpleRegistry;

  }