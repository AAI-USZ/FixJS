function() {
    var tests = testNames.map(require);
    
    async.list(tests)
        .expand(function(test) {
            return AsyncTest.testcase(test)
        }, AsyncTest.TestGenerator)
        .run()
        .each(function(test, next) {
            var node = document.createElement("div");
            node.className = test.passed ? "passed" : "failed";

            var name = test.name
            if (test.suiteName)
                name = test.suiteName + ": " + test.name

            var msg = "[" + test.count + "/" + test.index + "] " + name + " " + (test.passed ? "OK" : "FAIL")
            if (!test.passed) {
                if (test.err.stack)
                    var err = test.err.stack
                else
                    var err = test.err

                console.error(msg);
                console.error(err);
                msg += "<pre class='error'>" + err + "</pre>";
            } else {
                console.log(msg);
            }

            node.innerHTML = msg;
            log.appendChild(node);

            next()
        })
        .each(function(test) {
            if (test.passed)
                passed += 1
            else
                failed += 1
        })
        .end(function() {
            log.innerHTML += [
                "<div class='summary'>",
                "<br>",
                "Summary: <br>",
                "<br>",
                "Total number of tests: " + (passed + failed) + "<br>",
                (passed ? "Passed tests: " + passed + "<br>" : ""),
                (failed ? "Failed tests: " + failed + "<br>" : "")
            ].join("")
            console.log("Total number of tests: " + (passed + failed));
            console.log("Passed tests: " + passed);
            console.log("Failed tests: " + failed);
        })
}