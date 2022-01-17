function (that) {
        var schema = that.options.schema;
        var schemaName = that.options.recordType;
        // Only validate fields.
        schema = schema[schemaName].properties.fields.properties;

        that.validate = function (data) {
            var thisData = fluid.copy(data);
            try {
                // Only validate fields.
                validateImpl(thisData.fields, schema, that.validatePrimitive, that.lookupMessage, that.options.recordType);
            } catch (e) {
                return;
            }
            return thisData;
        };
    }