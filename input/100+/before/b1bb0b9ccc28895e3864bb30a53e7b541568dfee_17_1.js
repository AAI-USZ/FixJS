function(test, next) {
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
        }