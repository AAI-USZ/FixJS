function initializeValues() {
            var timeValue     =  db.retrieve(constants.BATTERY.TIME) || 600,
                volumeValue   =  db.retrieve(constants.BATTERY.VOLUME) || 100,
                chargingValue =  db.retrieve(constants.BATTERY.CHARGING);
                
            chargingValue = (chargingValue === "true");
            _volume       =   volumeValue * 1.00;
            document.getElementById(constants.BATTERY.TIME).value       = timeValue;
            document.getElementById(constants.BATTERY.VOLUME).value     = volumeValue;
            document.getElementById(constants.BATTERY.CHARGING).checked = chargingValue;

            updateBatteryVolumeValues();
            chargingVolume();
            interval = setInterval(chargingVolume, INTERVAL);
        }