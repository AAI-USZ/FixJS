function () {
                var cb = jasmine.createSpy();

                target.addEventListener("pause", cb);
                event.trigger("AppPause", null, true);
                expect(cb).toHaveBeenCalled();
            }