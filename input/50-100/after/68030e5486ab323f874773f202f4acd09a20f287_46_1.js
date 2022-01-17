function (require, exports, module) {
    "use strict";

    console.log("and a file that foo depends on!");

    exports.bar = function bar() {
        console.log("in bar in secondary!");
        window.setTimeout(function () { require("main").bar(); }, 300);
    };

}