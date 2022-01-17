function(Table) {
        return Table.initInstance = function() {
          var args, _ref3;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return (_ref3 = MITHGrid.Presentation).initInstance.apply(_ref3, ["MITHGrid.Presentation.Table"].concat(__slice.call(args), [function(that, container) {
            var c, headerEl, options, stringify_list, tableEl, _i, _len, _ref3;
            options = that.options;
            tableEl = $("<table></table>");
            headerEl = $("<tr></tr>");
            tableEl.append(headerEl);
            _ref3 = options.columns;
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
              c = _ref3[_i];
              headerEl.append("<th>" + options.columnLabels[c] + "</th>");
            }
            $(container).append(tableEl);
            that.hasLensFor = function() {
              return true;
            };
            stringify_list = function(list) {
              var lastV, text;
              if (list != null) {
                list = [].concat(list);
                if (list.length > 1) {
                  lastV = list.pop();
                  text = list.join(", ");
                  if (list.length > 1) {
                    text = text + ", and " + lastV;
                  } else {
                    text = text(" and " + lastV);
                  }
                } else {
                  text = list[0];
                }
              } else {
                text = "";
              }
              return text;
            };
            return that.render = function(container, model, id) {
              var c, cel, columns, el, isEmpty, item, rendering, _j, _len2, _ref4;
              columns = {};
              rendering = {};
              el = $("<tr></tr>");
              rendering.el = el;
              item = model.getItem(id);
              isEmpty = true;
              _ref4 = options.columns;
              for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
                c = _ref4[_j];
                cel = $("<td></td>");
                if (item[c] != null) {
                  cel.text(stringify_list(item[c]));
                  isEmpty = false;
                  columns[c] = cel;
                }
                el.append(cel);
              }
              if (!isEmpty) {
                tableEl.append(el);
                rendering.update = function(item) {
                  var c, _k, _len3, _ref5, _results;
                  _ref5 = options.columns;
                  _results = [];
                  for (_k = 0, _len3 = _ref5.length; _k < _len3; _k++) {
                    c = _ref5[_k];
                    if (item[c] != null) {
                      _results.push(columns[c].text(stringify_list(item[c])));
                    } else {
                      _results.push(void 0);
                    }
                  }
                  return _results;
                };
                rendering.remove = function() {
                  el.hide();
                  return el.remove();
                };
                return rendering;
              } else {
                el.remove();
                return null;
              }
            };
          }]));
        };
      }