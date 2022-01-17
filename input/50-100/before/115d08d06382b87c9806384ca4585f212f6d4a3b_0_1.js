function() {
        t.deepEqual(Array.from(arguments), [ "say", "hello" ], "args error");
        t.deepEqual(this, {iamthis: "root"}, "args error");
        t.end();

    }.args(["say", "hello"], {iamthis: "root"}