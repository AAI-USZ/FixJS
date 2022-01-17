function(object, putOptions) {
            // summary:
            //		Stores an object
            // object: Object
            //		The object to store.
            // directives: dojo.store.api.Store.PutDirectives?
            //		Additional directives for storing objects.
            // returns: Number|String

            putOptions = putOptions || {};

            var id = putOptions.id || this.getIdentity(object),
                entity = putOptions.entity || this.entityName,
                version = putOptions.version || this.getVersion(object),
                atom = !this.service.isJsonEnabled();

            if (id) object['$key'] = id;
            if (entity && atom) object['$name'] = entity;
            if (version) object['$etag'] = version;

            var handle = {},
                deferred = new Deferred(lang.hitch(this, this._onCancel, handle)),
                request = this._createEntryRequest(id, putOptions);

            var method = putOptions.overwrite
                ? request.update
                : request.create;

            handle.value = method.call(request, object, {
                success: lang.hitch(this, this._onTransmitEntrySuccess, deferred),
                failure: lang.hitch(this, this._onRequestFailure, deferred),
                abort: lang.hitch(this, this._onRequestAbort, deferred)
            });

            return deferred;
        }