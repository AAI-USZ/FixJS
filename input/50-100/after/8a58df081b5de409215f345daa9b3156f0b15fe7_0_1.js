function updateBatteryVolumeValues() {
            var volumeStr = _volume, batteryVolume, timeValue;

            batteryVolume = Math.round(_volume * 100) / 100 + "%";
            timeValue = volumeStr * time.value / 100.0;
            timeValue = Math.round(timeValue * 100) / 100;
            document.getElementById("battery-volume-label").innerHTML = batteryVolume;
            document.getElementById("battery-remaining-power").innerHTML = timeValue;
        }