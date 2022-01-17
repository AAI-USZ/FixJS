function (key, field, schema, priv) {
        return priv.collectObject(field.children(priv.ns.$cls("object-fields")), schema);
    }