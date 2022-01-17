function (key, field, schema, priv) {
        // if you change innerId format here change it in formatter above
        var
            innerId = field.attr("id") + "-inner";

        return priv.collectObject(innerId, schema);
    }