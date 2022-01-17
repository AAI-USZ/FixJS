function(tx, data) {
        var i, tags, _i, _ref;
        tags = [];
        for (i = _i = 0, _ref = data.rows.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          tags.push(new Readings.Tag(data.rows.item(i)));
        }
        return callback(tags);
      }