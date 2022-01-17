function (name) {
        var recordType = cspace.util.getUrlParameter(name),
            schema = {};
        schema[recordType] = null;
        return schema;
    }