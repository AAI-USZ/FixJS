function () {
        var
            nameOpts = {
                "type": "string",
                "name": "name",
                "title": "Name"
            },
            ageOpts = {
                "type": "number",
                "title": "Age",
                "name": "age"
            },
            fields;

        priv.ns._reset();

        fields = priv.genFields(["name", "age"], {
            "name": nameOpts,
            "age": ageOpts
        });

        checkGeneratedField(fields[0], "name", "Name", 0, "je-field je-name je-string", nameOpts);
        checkGeneratedField(fields[1], "age", "Age", 2, "je-field je-age je-number", ageOpts);
    }