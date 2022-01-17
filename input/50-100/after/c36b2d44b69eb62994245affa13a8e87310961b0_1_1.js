function(e) {
        var element, _ref7;
        element = e.target || e.srcElement;
        data.setGroupIndex(Number(element.value));
        if ((_ref7 = globals.groupSelection) == null) {
          globals.groupSelection = (function() {
            var _results;
            _results = [];
            for (keys in data.groups) {
              _results.push(Number(keys));
            }
            return _results;
          })();
        }
        return _this.start();
      }