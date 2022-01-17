function () {
        it("starts an interval", function () {
            var s = jasmine.createSpy("success"),
                f = jasmine.createSpy("fail");

            accel.start(s, f);
            expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), 50);
        });

        it("the interval function calls the success callback with the AccelerometerInfoChangedEvent", function () {
            var s = jasmine.createSpy("success"),
                f = jasmine.createSpy("fail");

            accel.start(s, f);

            event.trigger("AccelerometerInfoChangedEvent", [{
                accelerationIncludingGravity: {
                    x: 9.8,
                    y: 9.8,
                    z: 9.8
                }
            }], true);

            window.setInterval.mostRecentCall.args[0]();

            expect(s).toHaveBeenCalledWith({
                x: 9.8,
                y: 9.8,
                z: 9.8,
                timestamp: jasmine.any(Number)
            });

            expect(f).not.toHaveBeenCalled();
        });
    }