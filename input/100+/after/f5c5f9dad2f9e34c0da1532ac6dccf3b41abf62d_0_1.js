function () {
        deepEqualNoKey(priv.input("fieldname", "string", "asd"), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname"
            }
        }, "input");

        deepEqualNoKey(priv.input("fieldname", "string", "asd", {"default": "foo"}), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo"
            }
        }, "input");

        deepEqualNoKey(priv.input("fieldname", "string", "asd", {"default": "foo"}, true), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo",
                "required": true
            }
        }, "input");

        deepEqualNoKey(
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
            }, "input");

        deepEqualNoKey(
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
            }, "input"
        );

        deepEqualNoKey(
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
            }, "input"
        );

        deepEqualNoKey(
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
            }, "input"
        );

        deepEqualNoKey(
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
            }, "input"
        );
    }