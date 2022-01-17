function() {
        t.deepEqual(Array.from(arguments), [ "say", "hello" ], "args error");
        t.deepEqual(this, {key: "value"}, "args error");
        t.end();

    }.args(["say", "hello"], {key: "value"}