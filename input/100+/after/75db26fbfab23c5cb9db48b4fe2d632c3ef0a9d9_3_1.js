function () {
            var s = jasmine.createSpy("success"),
                f = jasmine.createSpy("fail");

            accel.start(s, f);
            expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), 50);
        }