function (path, type) {
    var protokey;
    for (protokey in type.prototype) {
      if (protokey !== 'save' && protokey !== 'update' && protokey !== 'insert' && protokey !== 'remove' && protokey !== 'reload' && protokey !== 'validate') {
        if (type.prototype.hasOwnProperty(protokey)) {
          path = path.split('.');
          var i;
          var result = Model.prototype;
          for(i = 0; i < path.length; i++) {
            var key = path[i];
            if (!result.hasOwnProperty(key)) {
              result[key] = {};
            }
            result = result[path[i]];
          }
          result[protokey] = type.prototype[protokey];
        }
      }
    }
  }