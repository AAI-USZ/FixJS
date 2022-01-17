function () {
                isValid = checkTimeValue(time.value);
                if (isValid) {//Valid value
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