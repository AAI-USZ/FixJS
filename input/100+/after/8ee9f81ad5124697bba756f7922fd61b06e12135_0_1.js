function() {
      var found, option, part, parts, regex, regexAnchor, result_id, results, searchText, startpos, text, zregex, _i, _j, _len, _len1, _ref;
      this.no_results_clear();
      this.create_option_clear();
      results = 0;
      searchText = this.search_field.value === this.default_text ? "" : this.search_field.value.strip().escapeHTML();
      regexAnchor = this.search_contains ? "" : "^";
      regex = new RegExp(regexAnchor + searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      zregex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        if (!option.disabled && !option.empty) {
          if (option.group) {
            $(option.dom_id).hide();
          } else if (!(this.is_multiple && option.selected)) {
            found = false;
            result_id = option.dom_id;
            if (regex.test(option.html)) {
              found = true;
              results += 1;
            } else if (option.html.indexOf(" ") >= 0 || option.html.indexOf("[") === 0) {
              parts = option.html.replace(/\[|\]/g, "").split(" ");
              if (parts.length) {
                for (_j = 0, _len1 = parts.length; _j < _len1; _j++) {
                  part = parts[_j];
                  if (regex.test(part)) {
                    found = true;
                    results += 1;
                  }
                }
              }
            }
            if (found) {
              if (searchText.length) {
                startpos = option.html.search(zregex);
                text = option.html.substr(0, startpos + searchText.length) + '</em>' + option.html.substr(startpos + searchText.length);
                text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
              } else {
                text = option.html;
              }
              if ($(result_id).innerHTML !== text) {
                $(result_id).update(text);
              }
              this.result_activate($(result_id));
              if (option.group_array_index != null) {
                $(this.results_data[option.group_array_index].dom_id).setStyle({
                  display: 'list-item'
                });
              }
            } else {
              if ($(result_id) === this.result_highlight) {
                this.result_clear_highlight();
              }
              this.result_deactivate($(result_id));
            }
          }
        }
      }
      if (results < 1 && searchText.length) {
        return this.no_results(searchText);
      } else {
        return this.winnow_results_set_highlight();
      }
    }