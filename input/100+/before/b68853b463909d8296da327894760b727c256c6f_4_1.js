function (path) {
            if (path === './error_handler') {
                return {
                    getErrorComponent: function (statusCode) {
                        return {
                            component: error,
                            view: statusCode
                        };
                    }
                };
            }

            if (path === './component_registry') {
                return {
                    getConfig: function (id, version) {
                        if (!componentMap[id] || !componentMap[id].config[version]) {
                            return;
                        }
                        return componentMap[id].config[version];
                    },
                    getLatestVersion: function (id) {
                        return '1.0';
                    }
                };
            }

            if (path === './configuration') {
                return {
                    loadingComponent: loadingComponent
                };
            }

            if (path === './socket_registry') {
                return {
                    register: function() {}
                };
            }

            if (path === './data_layer') {
                return dataLayer;
            }

            if (path === 'http') {
                return http;
            }

            if (path === 'socket.io') {
                return io;
            }

            return Module._load(path, this);
        }