function(_super) {

    __extends(WriteCsvPipe, _super);

    WriteCsvPipe.name = 'WriteCsvPipe';

    function WriteCsvPipe(log) {
      WriteCsvPipe.__super__.constructor.apply(this, arguments);
    }

    WriteCsvPipe.prototype.before = function(type, data) {
      return '';
    };

    WriteCsvPipe.prototype.beforeNext = function(type) {
      return '';
    };

    WriteCsvPipe.prototype.beforeFirst = function(type, data) {
      var key, row, value, _ref, _ref1;
      if (type === sdmx.SERIES) {
        row = [];
        _ref = data.seriesKey;
        for (key in _ref) {
          value = _ref[key];
          row.push(key);
        }
        _ref1 = data.obs.attributes;
        for (key in _ref1) {
          value = _ref1[key];
          row.push(key);
        }
        row.push('OBS_DIMENSION');
        row.push('OBS_VALUE');
        return row.join(',') + '\n';
      } else {
        return '';
      }
    };

    WriteCsvPipe.prototype.stringify = function(type, data) {
      var i, key, obs, row, rows, value, _i, _len, _ref, _ref1, _ref2;
      if (type === sdmx.SERIES) {
        rows = [];
        _ref = data.obs.obsValue;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          obs = _ref[i];
          row = [];
          _ref1 = data.seriesKey;
          for (key in _ref1) {
            value = _ref1[key];
            row.push(value);
          }
          _ref2 = data.obs.attributes;
          for (key in _ref2) {
            value = _ref2[key];
            row.push(value[i]);
          }
          row.push(data.obs.obsDimension[i]);
          row.push(obs);
          rows.push(row.join(','));
        }
        return rows.join('\n') + '\n';
      } else {
        return '';
      }
    };

    WriteCsvPipe.prototype.afterLast = function(type) {
      return '';
    };

    return WriteCsvPipe;

  }