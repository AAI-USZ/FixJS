function(state, data, channels, defaultAction) {
            var self = this,
                connectors = this.connectors,
                called = false; // makes sure the default handler is only called once

            // validate params
            if(channels == null && defaultAction == null) {
                // Max. 2 params
                if (typeof data === 'function') {
                    // (state, defaultAction)
                    defaultAction = data;
                    data = undefined;
                }
                else if ($.isArray(data)) {
                    // (state, channels)
                    channels = data;
                    data = undefined;
                }
            }
            else if(defaultAction == null) {
                // 2-3 params
                if (typeof channels === 'function') {
                    // (state, data, defaultAction)
                    defaultAction = channels;
                    channels = undefined;
                }

                if ($.isArray(data)) {
                    // (state, channels, defaultAction)
                    channels = data;
                    data = undefined;
                }
            }
           
            state = Tc.Utils.String.capitalize(state);
            data = data || {};
            channels = channels || Object.keys(connectors);
            
            for (var i = 0, len = channels.length; i < len; i++) {
                var connectorId = channels[i];
                if(connectors.hasOwnProperty(connectorId)) {
                    var connector = connectors[connectorId],
                        proceed = connector.notify(self, 'on' + state, data) || false;

                    if (proceed) {
                        // Make sure the default action is only called once (and not for every channel)
                        if (typeof defaultAction === 'function' && !called) {
                            called = true;
                            defaultAction();
                        }
                        connector.notify(self, 'after' + state, data);
                    }
                } else {
                    throw new Error('the module #' + self.id + ' is not connected to connector ' + connectorId);
                }
            }

            // Execute default action in any cases
            if (!called) {
                if (typeof defaultAction === 'function') {
                    defaultAction();
                }
            }
        }