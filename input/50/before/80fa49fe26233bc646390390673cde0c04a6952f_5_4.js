function () {
                var cb = jasmine.createSpy();

                target.addEventListener("pause", cb);
                event.trigger("appPause", null, true);
                expect(cb).toHaveBeenCalled();
            }