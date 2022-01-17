function() {
  var self = this;

  var _val_items = [];

  var _val_rules = [];

  self.default_message = '{alias}输入有误。';

  /**
   * Generate error message.
   * @param {String} message template of error message
   * @param {Object} item the validate object
   * @return {String} generated error message
   */
  var _final_message = function(message, item) {
    var msg = message;
    var variables = msg.match(/\{[.\w]+\}/ig);

    if (msg.indexOf('{alias}') >= 0) {
      msg = msg.replace('{alias}', item.alias);
    }

    for (var i in variables) {
      var key = variables[i].match(/\w+/ig);
      var value = item.pattern[key[0]];
      if (key.length > 1) {
        for (var v = 1; v < key.length; v++) {
          value = value[key[v]];
        }
      }
      if ( typeof (value) === 'object') {
        value = value.toString();
      }
      msg = msg.replace(variables[i], value);
    }
    msg = msg.replace(/\{[.\w]+\}/ig, '');
    return msg;
  };
  
  /**
   * Add rule to validator.
   * @param {String}name pattern's name
   * @param {Object} pattern pattern object
   */
  self.add_rule = function(name, pattern) {
    if (name !== '' && pattern && pattern.shoulda) {
      _val_rules[name] = pattern;
      return true;
    } else {
      return false;
    }
  };

  /**
   * A helper method to help callback get error items.
   * @return {Array} items array which not pass validates.
   */
  self.get_error_items = function() {
    var error_items = Array();
    for (var i in _val_items) {
      if (!_val_items[i].is_correct) {
        error_items.push(_val_items[i]);
      }
    }
    return error_items;
  };

  self.default_callback = undefined;

  self.submit_callback = undefined;
  
  /**
   * Regist a validate item.
   * @param {Object} item must have source, alias is recommand, condition is optional
   * @param {Object} pattern validate rules and other meta
   * @param {Function} callback will called after validate
   */
  self.ensure = function(item, pattern, callback) {
    var val_item = {
      source : item.source,
      pattern : pattern
    };
    if (item.alias !== undefined) {
      val_item.alias = item.alias;
    }
    if (item.condition !== undefined) {
      val_item.condition = item.condition;
    }
    if (callback !== undefined) {
      val_item.callback = callback;
    }
    _val_items.push(val_item);
  };

  /**
   * Validate a item by rules
   * @param {Object} item item which to be validated
   * @param {Boolean} use_callback call callback after validate or not
   * @return (Boolean) validate's result
   */
  self.do_validate = function(item, use_callback) {
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
  };

  /**
   * Check all items
   * @return (Boolean) if one of item not passed validates, return false
   */
  self.check_all = function() {
    var flag = true;
    for (var i in _val_items) {
      flag = self.do_validate(_val_items[i]) && flag;
    }

    if (self.submit_callback) {
      self.submit_callback();
    }

    if (!flag) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * Check a form's field.
   * @param {Object} e event sender
   * @return (Boolean) validate's result
   */
  self.check = function(e) {
    var event = arguments[0] || window.event;
    var item = null;
    for (var i in _val_items) {
      if (_val_items[i].source === event.id) {
        item = _val_items[i];
        break;
      }
    }
    return self.do_validate(item, true);
  };

  return self;
}