function () {
                if (time.value > 0 && time.value <= 600) {
                    comment.style.display = "none";
                    time.style.color = "black";
                    db.save(constants.BATTERY.TIME, time.value);
                    updateBattery();
                } else {
                       comment.style.display = "inline";
                    time.style.color = "red";
                    updateBattery();
                }
            }