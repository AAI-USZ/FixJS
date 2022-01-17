function () {
                var cb = jasmine.createSpy(),
                    cb2 = jasmine.createSpy();

                target.addEventListener("pause", cb);
                target.addEventListener("pause", cb2);
                event.trigger("appPause", null, true);
                expect(cb).toHaveBeenCalled();
                expect(cb2).toHaveBeenCalled();
            }