function(rs, mapper) {
      var i, objs, _i, _ref;
      objs = [];
      for (i = _i = 0, _ref = rs.rows.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        objs.push(mapper(rs.rows.item(i)));
      }
      return objs;
    }