function () {
        var utils = require('cordova/utils');

        beforeEach(function () {
            spyOn(window, "setInterval").andReturn("2");
            spyOn(utils, "createUUID").andReturn("leeroy jenkins");
        });

        it("gets and returns an id from createUUID", function () {
            var id = geo.watchPosition(s, e);
            expect(utils.createUUID).toHaveBeenCalled();
            expect(id).toBe("leeroy jenkins");
        });

        it("sets an interval for the default timeout", function () {
            geo.watchPosition(s, e);
            expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), Infinity);
        });

        it("sets an interval for the provided timeout", function () {
            geo.watchPosition(s, e, {timeout: 10});
            expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), 10);
        });

        it("calls exec on the given interval", function () {
            geo.watchPosition(s, e);
            var func = window.setInterval.mostRecentCall.args[0];
            func();
            expect(exec).toHaveBeenCalled();
        });
    }