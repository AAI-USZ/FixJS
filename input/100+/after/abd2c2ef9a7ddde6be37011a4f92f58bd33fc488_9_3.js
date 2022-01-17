function(namespace, layer, scope, duration) {

            var self = this;

            if (!namespace) {
                throw new Error("Entity#addLayer - Layer requires a namespace");
            }

            if (typeof namespace === 'object') {

                for (var n in namespace) {

                    if (namespace.hasOwnProperty(n)) {
                        this.addLayer(n, namespace[n], scope);
                    }

                }

                return this;

            }
            
            var bound = layer.bind(scope || this);
            
            bound.created_at = Date.now();
            bound.expires_at = duration || false;
            bound.callback = function() {};
            
            this.layers[namespace] = bound;

            return {

                then: function(cb) {
                    bound.callback = cb;
                }

            };

        }