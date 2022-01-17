function () {
                _volume = volume.value * 1.00;
                updateBatteryVolumeValues();
                db.save(constants.BATTERY.VOLUME, volume.value);
                clearInterval(interval);
                interval = setInterval(chargingVolume, INTERVAL);
            }