function () {
            var freq = 1,
                amp = 30,
                value = Math.round(amp * Math.sin(freq * count * (180 / Math.PI)) * 100) / 100;

            if (count > stopCount) {
                _motion.accelerationIncludingGravity.x = oldX;
                event.trigger("AccelerometerInfoChangedEvent", [_motion]);
                clearInterval(id);
                return;
            }

            _motion.accelerationIncludingGravity.x = value;

            event.trigger("AccelerometerInfoChangedEvent", [_motion]);

            count++;

        }