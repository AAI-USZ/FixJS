function(key, val) {
          var value;
          value = $.isArray(val) ? val[0] : val;
          return _this.addError($(_this.el).find("[name*=" + key + "]"), value);
        }