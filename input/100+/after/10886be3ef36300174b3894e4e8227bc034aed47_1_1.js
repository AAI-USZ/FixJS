function() {
      var source = _.template('<% if x %>').source;
      ok(source.indexOf('__p') > -1);
    }