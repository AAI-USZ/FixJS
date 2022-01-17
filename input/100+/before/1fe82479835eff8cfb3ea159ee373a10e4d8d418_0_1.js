function (mochaAsPromised) {
    "use strict";

    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // Node.js
        module.exports = mochaAsPromised;
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