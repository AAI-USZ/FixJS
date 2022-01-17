function(rs, mapper) {
      var i, objs, _ref;
      objs = [];
      for (i = 0, _ref = rs.rows.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        objs.push(mapper(rs.rows.item(i)));
      }
      return objs;
    }