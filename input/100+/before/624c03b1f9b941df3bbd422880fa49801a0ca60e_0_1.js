function(attribute, binding) {
                if (!_.isArray(attribute))
                    attribute = [attribute, [null, null]];

                if (!_.isArray(attribute[1]))
                    attribute[1] = [attribute[1], null];

                // Check to see if a binding is already bound to another attribute.
                if (this._bindings[binding])
                    throw new Error("'" + binding + "' is already bound to '" + attribute[0] + "'.");

                // Split bindings just like Backbone.View.events where the first half
                // is the property you want to bind to and the remainder is the selector
                // for the element in the view that property is for.
                var match = binding.match(bindingSplitter),
                    property = match[1],
                    selector = match[2],
                    // Find element in view for binding. If there is no selector
                    // use the view's el.
                    el = (selector) ? this.$(selector) : this.$el,
                    // Finder binder definition for binding by property. If it can't be found
                    // default to property 'attr'.
                    binder = Backbone.View.Binders[property] || Backbone.View.Binders['__attr__'],
                    // Fetch accessors from binder. The context of the binder is the view
                    // and binder should return an object that has 'set' and or 'get' keys.
                    // 'set' must be a function and has one argument. `get` can either be
                    // a function or a list [events, function] .The context of both set and
                    // get is the views's $el.
                    accessors = binder.call(this, this.model, attribute[0], property);

                if (!accessors)
                    return;

                // Normalize get accessors if only a function was provided. If no
                // events were provided default to on 'change'.
                if (!_.isArray(accessors.get))
                    accessors.get = ['change', accessors.get];

                if (!accessors.get[1] && !accessors.set)
                    return;

                // Event key for model attribute changes.
                var setTrigger = 'change:' + attribute[0];
                    // Event keys for view.$el namespaced to the view for unbinding.
                    getTrigger = _.reduce(accessors.get[0].split(' '), function(memo, event) {
                        return memo + ' ' + event + '.modelBinding' + this.cid;
                    }, '', this);

                // Default to identity transformer if not provided for attribute.
                var setTransformer = attribute[1][0] || identityTransformer,
                    getTransformer = attribute[1][1] || identityTransformer;

                // Create get and set callbacks so that we can reference the functions
                // when it's time to unbind. 'set' for binding to the model events...
                var set = _.bind(function(model, value, options) {
                    // Skip if this callback was bound to the element that
                    // triggered the callback.
                    if (options && options.el && options.el.get(0) == el.get(0))
                        return;

                    // Set the property value for the binder's element.
                    accessors.set.call(el, setTransformer.call(this, value));
                }, this);

                // ...and 'get' callback for binding to DOM events.
                var get = _.bind(function(event) {
                    // Get the property value from the binder's element.
                    // console.log(attribute[0], getTransformer);
                    var value = getTransformer.call(this, accessors.get[1].call(el));

                    this.model.set(attribute[0], value, {
                        el: this.$(event.srcElement)
                    });
                }, this);

                if (accessors.set) {
                    this.model.on(setTrigger, set);
                    // Trigger the initial set callback manually so that the view is up
                    // to date with the model bound to it.
                    set(this.model, this.model.get(attribute[0]));
                }

                if (accessors.get[1])
                    this.$el.on(getTrigger, get);

                // Save a reference to binding so that we can unbind it later.
                this._bindings[binding] = {
                    getTrigger: getTrigger,
                    setTrigger: setTrigger,
                    get: get,
                    set: set
                };
            }