function(values) {
          var count, i, items, items_list, recalc_items, that, _i, _len;
          that = {};
          items = {};
          count = 0;
          recalc_items = true;
          items_list = [];
          that.isSet = true;
          that.items = function() {
            var i;
            if (recalc_items) {
              items_list = [];
              for (i in items) {
                if (typeof i === "string" && items[i] === true) items_list.push(i);
              }
            }
            return items_list;
          };
          that.add = function(item) {
            if (!(items[item] != null)) {
              items[item] = true;
              recalc_items = true;
              return count += 1;
            }
          };
          that.remove = function(item) {
            if (items[item] != null) {
              delete items[item];
              recalc_items = true;
              return count -= 1;
            }
          };
          that.empty = function() {
            items = {};
            count = 0;
            recalc_items = false;
            items_list = [];
            return;
          };
          that.visit = function(fn) {
            var o, _results;
            _results = [];
            for (o in items) {
              if (fn(o) === true) {
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          that.contains = function(o) {
            return items[o] != null;
          };
          that.size = function() {
            if (recalc_items) {
              return that.items().length;
            } else {
              return items_list.length;
            }
          };
          if (values instanceof Array) {
            for (_i = 0, _len = values.length; _i < _len; _i++) {
              i = values[_i];
              that.add(i);
            }
          }
          return that;
        }