function(item, use_callback) {
    item.is_correct = true;
    item.error_messages = [];

    if (!item.condition || item.condition()) {
      var pattern = item.pattern;
      for (var i in pattern.validates) {
        var rule = _val_rules[pattern.validates[i]];
        if (rule === undefined) {
          continue;
        }

        if (rule.preprocessing) {
          rule.preprocessing(pattern);
        }

        var value = null;
        if ( typeof (item.source) === "string") {
          value = window.document.getElementById(item.source).value.trim();
        } else if ( typeof (item.source) === "function") {
          value = item.source();
        }
        if (!rule.shoulda(value, pattern)) {
          item.is_correct = false;
          if (pattern.message) {
            item.error_messages.push(_final_message(pattern.message, item));
          } else if (rule.message) {
            item.error_messages.push(_final_message(rule.message, item));
          } else {
            item.error_messages.push(_final_message(self.default_message, item));
          }
        }
      }
    }

    if (use_callback) {
      if (item.callback) {
        item.callback(item, value);
      } else if (self.default_callback) {
        self.default_callback(item, value);
      }
    }

    return item.is_correct;
  }