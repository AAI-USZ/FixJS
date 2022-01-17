function () {
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
        }