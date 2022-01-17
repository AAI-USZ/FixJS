function(action, options, cb) {
            var callback, command, instance;

            // If there are no options use it as the callback
            if ('function' === typeof options) {
                callback = options;
                options = {};
            } else {
                callback = cb;
            }

            // If we don't have a callback set an empty one
            if ('function' !== typeof callback) {
                // TODO: this can be a constant function...not created on each
                // invoke call.
                callback = function() {};
            }

            // Make sure we have a "params" key in our "options" object
            options.params = options.params || {};

            // This is the "partial instance" which isn't an "Object instance"
            // :). At least one of base or type must be defined.
            // TODO: we don't check base vs. type here...
            instance = {
                base: this._base,
                type: this.type,
                guid: this._instanceId, // DEPRECATED, use instanceId instead
                instanceId: this._instanceId,
                config: Y.mojito.util.copy(this.config)
            };

            // Create the command we will use to call executeAction() with
            command = {
                instance: instance,
                action: action,
                params: { // Explicitly map the params to there keys
                    route: options.params.route || {},
                    // NOTE the defaulting here to drive from URL if no explicit
                    // params are provided.
                    // TODO: we should have an explicit override option here and
                    // merge...
                    url: options.params.url || this.getFromUrl(),
                    body: options.params.body || {},
                    file: options.params.file || {}
                },
                // NOTE this isn't a standard command option.
                // TODO: not really "proper" to be part of command object,
                // should really be somewhere else...but where?
                rpc: options.rpc || false
            };

            this._client.executeAction(command, this.getId(), callback);
        }