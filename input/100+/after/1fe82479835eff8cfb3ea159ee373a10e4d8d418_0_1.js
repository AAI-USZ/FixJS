function (mochaAsPromised) {
    "use strict";

    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // Node.js: plug in automatically, if no argument is provided. This is a good idea since one can run Mocha tests
        // using the Mocha test runner from either a locally-installed package, or from a globally-installed one.
        // In the latter case, naively plugging in `require("mocha")` would end up duck-punching the wrong instance,
        // so we provide this shortcut to auto-detect which Mocha package needs to be duck-punched.
        module.exports = function (mocha) {
            if (!mocha) {
                var path = require("path");

                // `process.argv[1]` is either something like `"/path/to/host/package/node_modules/mocha/bin/_mocha`",
                // or `"/path/to/global/node_modules/mocha/bin/_mocha"`. Verify that, though:
                var lastThreeSegments = process.argv[1].split(path.sep).slice(-3);
                if (lastThreeSegments[0] !== "mocha" || lastThreeSegments[1] !== "bin") {
                    throw new Error("Attempted to automatically plug in to Mocha, but was not running through the " +
                                    "Mocha test runner. Either run using the Mocha command-line test runner, or " +
                                    "plug in manually by passing the running Mocha module to Mocha as Promised.");
                }

                var mochaPath = path.resolve(process.argv[1], "../..");
                mocha = require(mochaPath);
            }

            mochaAsPromised(mocha);
        };
    } else if (typeof define === "function" && define.amd) {
        // AMD
        define(function () {
            return mochaAsPromised;
        });
    } else {
        // Other environment (usually <script> tag): plug in global `mocha` directly and automatically.
        mochaAsPromised(mocha);
    }
}