function () {
    test(function (code) {
        ok(code, "red tests");
        lint(function (code) {
            ok(code);
            build(null, {compress: true});
        });
    });
}