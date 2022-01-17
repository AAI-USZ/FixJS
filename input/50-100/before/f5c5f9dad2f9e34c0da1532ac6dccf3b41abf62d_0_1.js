function checkField(opts, classes, required) {
        priv.ns._reset();

        var field = priv.genField("name", opts, required);
        checkGeneratedField(field, "name", "Name", 0, classes, opts, required);
    }