function () {
            it("uses default PositionOptions if none are specified", function () {
                geo.getCurrentPosition(s, e);
                expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [false, Infinity, 0]);
            });

            it("uses the maximumAge option if specified", function () {
                geo.getCurrentPosition(s, e, {maximumAge: 10});
                expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [false, Infinity, 10]);
            });

            it("uses the enableHighAccuracy option if specified", function () {
                geo.getCurrentPosition(s, e, {enableHighAccuracy: true, maximumAge: 100});
                expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [true, Infinity, 100]);
            });

            it("uses the timeout option if specified and positive", function () {
                geo.getCurrentPosition(s, e, {timeout: 1000});
                expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [false, 1000, 0]);
            });

            it("uses a timeout value of 0 if specified and negative, which should call the error callback immediately (since we have no cached position)", function () {
                geo.getCurrentPosition(s, e, {timeout: -1000});
                expect(e).toHaveBeenCalledWith({
                    code:PositionError.TIMEOUT,
                    message:"timeout value in PositionOptions set to 0 and no cached Position object available, or cached Position object's age exceed's provided PositionOptions' maximumAge parameter."
                });
            });

            it("can be used with one, two or three arguments", function() {
                expect(function() { geo.getCurrentPosition(s); }).not.toThrow();
                expect(function() { geo.getCurrentPosition(s,e); }).not.toThrow();
                expect(function() { geo.getCurrentPosition(s,e,{}); }).not.toThrow();
            });

            it("should throw an exception if used with no arguments", function() {
                expect(function() { geo.getCurrentPosition();}).toThrow("getCurrentPosition must be called with at least one argument.");
            });
        }