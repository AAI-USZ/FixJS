function () {
                updateBatteryVolumeValues();
                db.save(constants.BATTERY.VOLUME, volume.value);
                clearInterval(interval);
                interval = setInterval(chargingVolume, INTERVAL);
            }