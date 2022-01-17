function () {
                var app = require("ripple/app"),
                    cb = jasmine.createSpy();

                spyOn(app, "getInfo").andReturn({
                    features: {
                        "blackberry.app": {}
                    }
                });

                target.addEventListener("resume", cb);
                event.trigger("appResume", null, true);
                expect(cb).toHaveBeenCalled();
            }