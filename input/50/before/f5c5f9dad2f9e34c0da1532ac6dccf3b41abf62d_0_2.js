function checkInputType(type, expectedType) {
        deepEqual(
            priv.input("foo", type, "asd", {}),
            {
                "input": {
                    "id": "asd",
                    "name": "foo",
                    "type": expectedType
                }
            }
        );
    }