function(options, formData) {
        var self = this, o = $.extend({}, options);

        // Allow for dynamically generated data
        if ($.isFunction(o.data)) {
          o.data = o.data.call(self, formData);
        }

        // Wrap the complete method with our own
        o.complete = function(xhr, status) {
          if ($.isFunction(options.complete)) {
            options.complete.apply(self, arguments);
          }

          self.next("save");
        };

        var formDataType = _type(formData), optionsDataType = _type(o.data);

        // Data types must match in order to merge
        if ( formDataType !== optionsDataType ) {
          throw "Type mismatch: cannot merge form data with options data!";
        } else if ( formDataType === "array" ) {
          o.data = $.merge(formData, o.data);
        } else if ( formDataType === "object" ) {
          o.data = $.extend(formData, o.data);
        } else if ( formDataType === "string" ) {
          o.data = formData + (formData.length ? "&" : "") + o.data;
        } else {
          o.data = formData;
        }

        $.ajax(o);

        // Asynchronous
        return false;
      }