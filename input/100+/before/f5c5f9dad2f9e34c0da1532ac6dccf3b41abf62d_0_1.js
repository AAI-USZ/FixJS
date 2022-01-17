function () {
        deepEqual(priv.input("fieldname", "string", "asd"), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname"
            }
        });

        deepEqual(priv.input("fieldname", "string", "asd", {"default": "foo"}), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo"
            }
        });

        deepEqual(priv.input("fieldname", "string", "asd", {"default": "foo"}, true), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo",
                "required": true
            }
        });

        deepEqual(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "maxLength": 10
            }, true),
            {
                "input": {
                    "id": "asd",
                    "type": "text",
                    "name": "fieldname",
                    "value": "foo",
                    "required": true,
                    "maxlength": 10
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "maxLength": 10,
                "description": "the asd field"
            }, true),
            {
                "input": {
                    "id": "asd",
                    "type": "text",
                    "name": "fieldname",
                    "value": "foo",
                    "required": true,
                    "maxlength": 10,
                    "title": "the asd field"
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "maxLength": 10,
                "description": "the asd field",
                "pattern": "[1-9]+"
            }, true),
            {
                "input": {
                    "id": "asd",
                    "type": "text",
                    "name": "fieldname",
                    "value": "foo",
                    "required": true,
                    "maxlength": 10,
                    "title": "the asd field",
                    "pattern": "[1-9]+"
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "number", "asd", {
                "type": "number",
                "maximum": 20,
                "minimum": 10
            }),
            {
                "input": {
                    "id": "asd",
                    "name": "fieldname",
                    "type": "number",
                    "max": 20,
                    "min": 10
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "number", "asd", {
                "type": "number",
                "maximum": 20,
                "minimum": 10,
                "exclusiveMaximum": true,
                "exclusiveMinimum": true
            }),
            {
                "input": {
                    "id": "asd",
                    "name": "fieldname",
                    "type": "number",
                    "max": 19,
                    "min": 11
                }
            }
        );
    }