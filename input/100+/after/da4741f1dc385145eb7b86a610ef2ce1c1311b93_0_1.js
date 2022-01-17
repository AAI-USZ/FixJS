function(data, query) {
        var formatted, forward, matchCound, name, num, regx, str, this_data, _k, _l, _len2, _len3, _ref2;
        if (!options.matchCase) {
          query = query.toLowerCase();
        }
        query = query.replace('(', '\(', 'g').replace(')', '\)', 'g');
        matchCound = 0;
        results_holder.hide().html(results_ul.html(''));
        num = 0;
        for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
          item = data[_k];
          num_count++;
          forward = false;
          if (options.searchObjProps === 'value') {
            str = item.value;
          } else {
            str = '';
            _ref2 = options.searchObjProps.split(',');
            for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
              name = _ref2[_l];
              str += "" + item[$.trim(name)] + " ";
            }
          }
          if (str) {
            if (!options.matchCase) {
              str = str.toLowerCase();
            }
            if (str.indexOf(query) !== -1 && !Selections.exist(item[options.selectedValuesProp])) {
              forward = true;
            }
          }
          if (forward) {
            formatted = $("<li class=\"as-result-item\" id=\"as-result-item-" + num + "\"></li>");
            formatted.click(function() {
              var number, raw_data;
              element = $(this);
              raw_data = element.data('data');
              number = raw_data.num;
              if (selections_holder.find("#as-selection-" + number).length <= 0 && !tab_press) {
                data = raw_data.attributes;
                input.val('').focus();
                prev = '';
                add_selected_item(data, number);
                options.resultClick.call(this, raw_data);
                results_holder.hide();
              }
              tab_press = false;
            });
            formatted.mousedown(function() {
              input_focus = false;
            });
            formatted.mouseover(function() {
              element = $(this);
              results_ul.find('li').removeClass('active');
              element.addClass('active');
            });
            formatted.data('data', {
              attributes: data[num],
              num: num_count
            });
            this_data = $.extend({}, data[num]);
            query = query.replace(/"/g, '\\"');
            regx = !options.matchCase ? new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + escapeHtml(query) + ")(?![^<>]*>)(?![^&;]+;)", "gi") : new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + escapeHtml(query) + ")(?![^<>]*>)(?![^&;]+;)", "g");
            /* When this is a string, escape the value and process a regular replacement for highlighting.
            */

            if (typeof this_data[options.selectedItemProp] === 'string') {
              this_data[options.selectedItemProp] = escapeHtml(this_data[options.selectedItemProp]);
              if (options.resultsHighlight && query.length > 0) {
                this_data[options.selectedItemProp] = this_data[options.selectedItemProp].replace(regx, '<em>$1</em>');
              }
            } else {
              this_data[options.selectedItemProp].html(this_data[options.selectedItemProp].html().replace(regx, '<em>$1</em>'));
            }
            if (!options.formatList) {
              formatted = formatted.html(this_data[options.selectedItemProp]);
            } else {
              formatted = options.formatList.call(this, this_data, formatted);
            }
            results_ul.append(formatted);
            this_data = null;
            matchCound++;
            if (options.retrieveLimit && options.retrieveLimit === matchCound) {
              break;
            }
          }
          num += 1;
        }
        selections_holder.removeClass('loading');
        if (matchCound <= 0) {
          results_ul.html("<li class=\"as-message\">" + options.emptyText + "</li>");
        }
        results_ul.css({
          width: selections_holder.outerWidth()
        });
        if (matchCound > 0 || !options.showResultListWhenNoMatch) {
          results_holder.show();
        }
        return options.resultsComplete.call(this);
      }