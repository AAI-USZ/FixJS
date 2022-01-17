function updateBatteryVolumeValues() {
            var volumeStr = _volume + "", batteryVolume, timeValue;

            batteryVolume = _getBatteryVolume(volumeStr);
            timeValue = volumeStr * time.value / 100.0;
            timeValue = Math.floor(timeValue * 100.0) / 100.0;
            document.getElementById("battery-volume-label").innerHTML = batteryVolume;
            document.getElementById("battery-remaining-power").innerHTML = timeValue;
        }