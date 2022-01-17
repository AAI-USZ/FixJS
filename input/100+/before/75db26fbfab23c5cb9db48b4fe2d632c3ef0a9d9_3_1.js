function () {
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

            expect(s).toHaveBeenCalledWith({
                x: 1,
                y: 1,
                z: 1,
                timestamp: jasmine.any(Number)
            });

            expect(f).not.toHaveBeenCalled();
        }