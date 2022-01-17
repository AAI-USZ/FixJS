function checkField(opts, classes, required) {
        priv.ns._reset();

        var field = priv.genField("name", opts, required);

        delete field.div.$childs[1].input.$keyup;
        checkGeneratedField(field, "name", "Name", 0, classes, opts, required);
    }