function updateBattery() {
            var timeValue     =  db.retrieve(constants.BATTERY.TIME) || 600,
                volumeValue   =  db.retrieve(constants.BATTERY.VOLUME) || 100;

            clearInterval(interval);
            _volume       =   volumeValue * 1.00;
            document.getElementById(constants.BATTERY.TIME).value       = timeValue;
            document.getElementById(constants.BATTERY.VOLUME).value     = volumeValue;
            updateBatteryVolumeValues();
            interval = setInterval(chargingVolume, INTERVAL);
        }