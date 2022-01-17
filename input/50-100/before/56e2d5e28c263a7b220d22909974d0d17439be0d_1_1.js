function(options) {
            //: _allowedProperties are the list of properties from options that we want to 
            //: directly attach to this Model object
            //: _ignoreAttribures are the list of properties from options that we dont want
            //: to turn into Backbone.Model `attributes` 
            var args = [].slice.call(arguments, 0)[0];
            _.each(options, this._allowProperties, this);
            _.each(args, function(value, key) {
                if (_.include(this._ignoredAttributes, key)) delete args[key];
            }, this);
            return Backbone.Model.call(this, args);
        }