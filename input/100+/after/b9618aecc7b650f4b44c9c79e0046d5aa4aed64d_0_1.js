function sync(method, model, options) {
        if (model instanceof Backbone.Model && !model.name) {
            throw new Error('A "name" property must be specified');
        }

        switch (method) {
        case 'create':
            db.incr('id:' + model.name, function(err, id) {
                if (err) return options.error(err);
                store(id, model, options);
            });
            break;
        case 'read':
            if (model.models !== undefined) {
                // it's a Collection
                if (options.lookup) {
                    if (typeof model.model.prototype.lookups[options.lookup.key] === 'undefined') {
                        options.error(new Error('Cannot lookup by property "' + options.lookup.key + '"'));
                        break;
                    }
                    retrieveByProperty(model.model.prototype.name, model,
                        options.lookup.key, options.lookup.value, options);
                } else {
                    retrieveAll(model.model.prototype.name, model, options);
                }
            } else {
                // TODO: Handle loading models based on other parameters than id.
                if (!model.id && model.id !== 0) {
                    options.error(new Error('An id is required to load models'));
                    break;
                }
                retrieve(model.id, model, options);
            }
            break;
        case 'update':
            store(model.id, model, options);
            break;
        case 'delete':
            destroy(model.id, model, options);
            break;
        default:
            options.error(new Error('Invalid method ' + method));
        }
    }