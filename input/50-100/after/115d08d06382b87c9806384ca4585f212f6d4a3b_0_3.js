function() {
        t.deepEqual(Array.from(arguments), [ "dont mind your args" ], "args error");
        t.deepEqual(this, {key: "value"}, "args error");
    }.pass(["dont mind your args"], {key: "value"}