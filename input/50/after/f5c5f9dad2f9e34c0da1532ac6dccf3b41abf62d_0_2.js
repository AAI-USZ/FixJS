function checkInputType(type, expectedType) {
        deepEqualNoKey(
            priv.input("foo", type, "asd", {}),
            {
                "input": {
                    "id": "asd",
                    "name": "foo",
                    "type": expectedType
                }
            }, "input"
        );
    }