function() {
        t.deepEqual(Array.from(arguments), [ "dont mind your args" ], "args error");
        t.deepEqual(this, {iamthis: "root"}, "args error");

        t.end();
    }.pass(["dont mind your args"], {whoami: "root"}