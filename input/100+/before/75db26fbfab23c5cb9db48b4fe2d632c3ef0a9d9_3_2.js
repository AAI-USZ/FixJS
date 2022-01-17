function () {
            var s = jasmine.createSpy("success"),
                f = jasmine.createSpy("fail");

            accel.start(s, f);

            event.trigger("AccelerometerInfoChangedEvent", [{
                accelerationIncludingGravity: { x: 9.8, y: 9.8, z: 9.8 } 
            }], true);

            event.trigger("AccelerometerInfoChangedEvent", [{
                accelerationIncludingGravity: { x: 9.8, y: 9.8, z: 9.8 } 
            }], true);

            expect(s.callCount).toBe(2);
        }