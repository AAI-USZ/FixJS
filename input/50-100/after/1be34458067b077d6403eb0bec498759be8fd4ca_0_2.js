function(tx, data) {
        var i, tags, _ref;
        tags = [];
        for (i = 0, _ref = data.rows.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          tags.push(new Readings.Tag(data.rows.item(i)));
        }
        return callback(tags);
      }