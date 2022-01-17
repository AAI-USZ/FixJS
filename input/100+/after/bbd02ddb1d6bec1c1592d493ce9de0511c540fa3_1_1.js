function (error, window) {
        global.window = window;
        global.document = window.document;
        global.jQuery = window.jQuery;

        global.describeBrowser = function () {
            return global.xdescribe.apply(global, Array.prototype.slice.call(arguments));
        };

        global.itBrowser = function () {
            return global.xit.apply(global, Array.prototype.slice.call(arguments));
        };

        _extraMocks();

        ready();
    }