function filter(index, result) {
      var _this = this;
      return ifParsed(result, function(group, rest) {
        if (index < _this.filters.length) {
          try {
            return _this.filter(index + 1, [
              cleanupMacro(_this.filters[index](function() {
                return _this.filterInfo;
              })(function() {
                return group;
              })), null, rest
            ]);
          } catch (err) {
            return [null, err.toString(), null];
          }
        } else {
          return [group, null, rest];
        }
      });
    }