function () {
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
        }