function(options) {
      _.defaults(options, {
        mapping: {},
        view_model: null
      });
      if (!_.isObject(options.mapping[""])) {
        options.mapping[""] = {};
      }
      _.defaults(options.mapping[""], {
        key: function(item) {
          return ko.utils.unwrapObservable(item._id);
        }
      });
      if (_.isFunction(options.view_model)) {
        return options.mapping[""].create = function(opts) {
          var view_model;
          if (!opts.data) {
            return ko.observable();
          }
          view_model = new options.view_model(opts.data);
          return ko.mapping.fromJS(opts.data, options.mapping, view_model);
        };
      }
    }