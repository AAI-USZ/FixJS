function(opts) {
          var view_model;
          if (!opts.data) {
            return ko.observable();
          }
          view_model = new options.view_model();
          return ko.mapping.fromJS(opts.data, options.mapping, view_model);
        }