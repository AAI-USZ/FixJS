function () {
                var cb = jasmine.createSpy();

                target.addEventListener("resume", cb);
                event.trigger("appResume", null, true);
                expect(cb).toHaveBeenCalled();
            }