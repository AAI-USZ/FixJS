function () {
        beforeEach(function () {
            spyOn(window, "setInterval").andReturn("woohoo");
            spyOn(window, "clearInterval");
        });

        it("calls clear interval for the watch", function () {
            var timer = geo.watchPosition(s, e);
            geo.clearWatch(timer);
            expect(window.clearInterval).toHaveBeenCalledWith("woohoo");
        });

        it("only calls clear interval once", function () {
            var timer = geo.watchPosition(s, e);
            geo.clearWatch(timer);
            geo.clearWatch(timer);
            expect(window.clearInterval.callCount).toBe(1);
        });

        it("doesn't call clear interval when no watch", function () {
            geo.clearWatch("derp");
            expect(window.clearInterval).not.toHaveBeenCalled();
        });
    }