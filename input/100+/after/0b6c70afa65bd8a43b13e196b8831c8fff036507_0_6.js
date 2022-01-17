function (storeName, method, object, options) {
            try
            {
                //debug_log("execute : " + method +  " on " + storeName + " for " + object.id);
                var now = new Date();
                switch (method) {
                case "create":
                    object.set({created: now, 'modified':now});
                    this.write(storeName, object, options);
                    break;
                case "read":
                    if (object instanceof Backbone.Collection) {
                        this.query(storeName, object, options); // It's a collection
                    } else {
                        this.read(storeName, object, options); // It's a model
                    }
                    break;
                case "update":
                    object.set({modified: now});
                    this.write(storeName, object, options); // We may want to check that this is not a collection. TOFIX
                    break;
                case "delete":
                    this.delete(storeName, object, options); // We may want to check that this is not a collection. TOFIX
                    break;
                default:
                    // Hum what?
                }
            }
            catch(e)
            {
                options.error(e);
            }
        }