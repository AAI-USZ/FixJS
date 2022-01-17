function (require, exports, module) {
    "use strict";

    console.log("loading foo!");

    require("secondary").bar();

    exports.bar = function bar() {
        console.log("in bar in foo!");
    };

}