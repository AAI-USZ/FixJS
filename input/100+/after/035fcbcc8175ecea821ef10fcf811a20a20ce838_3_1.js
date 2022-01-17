function () {
        it("de-registers onBatterStateChange", function () {
            var listener = jasmine.createSpy();
            systemEvent.deviceBatteryStateChange(listener);

            _run(20, [
                function () {
                    systemEvent.deviceBatteryStateChange(null);
                },
                function () {
                    event.trigger("DeviceBatteryStateChanged", [false]);
                },
                function () {
                    expect(listener).not.toHaveBeenCalled();
                }
            ]);
        });

        it("registers and invokes onBatteryStateChange", function () {
            var listener = jasmine.createSpy();
            systemEvent.deviceBatteryStateChange(listener);

            _run(20, [
                function () {
                    event.trigger("DeviceBatteryStateChanged", [false]);
                },
                function () {
                    expect(listener).toHaveBeenCalledWith(3); // UNPLUGGED
                }
            ]);
        });

    }