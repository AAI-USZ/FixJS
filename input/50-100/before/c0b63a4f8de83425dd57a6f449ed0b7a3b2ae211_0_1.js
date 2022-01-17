function () {
                db.save(constants.BATTERY.TIME, time.value);
                clearInterval(interval);
                if ((time.value !== undefined) && (time.value > 0)) {
                    interval = setInterval(chargingVolume, INTERVAL);
                }
            }