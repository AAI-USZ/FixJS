function chargingVolume() {
            var step, status, level, type, batteryLifeTime, batteryPercent, chargingStatus, chargingTime, dischargingTime;

            batteryLifeTime = 60.0 * time.value;
            batteryPercent = _volume * 1.0;

            if (charging.checked) {
                step = 100;
                chargingStatus = true;
                // charging is 10 times faster than discharging
                chargingTime = (batteryLifeTime * (100.0 - batteryPercent)) / 100.0 / 10.0;
                dischargingTime = Infinity;
                type = "chargingchange";

                if (batteryPercent + 100 / batteryLifeTime > 99.9999) {
                    clearInterval(interval);
                }
            } else {
                step = -100;
                chargingStatus = false;
                chargingTime = Infinity;
                dischargingTime = batteryLifeTime * batteryPercent / 100.0;
                type = "dischargingtimechange";

                if (batteryPercent - 100 / batteryLifeTime < 0.0001) {
                    clearInterval(interval);
                }
            }
            level = (_volume  + step /(60.0 *  time.value)) / 100.0;
            if (level < 0.0001) {
                level = 0;
            } else if (level > 0.9999) {
                level = 1.0;
            }

            status = {
                charging: chargingStatus,
                chargingTime: chargingTime,
                dischargingTime: dischargingTime,
                level: level,
                type: type
            };

            event.trigger("BatteryEvent", [status]);
            _volume = level * 100.0;
            updateBatteryVolumeValues();
        }