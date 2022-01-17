function (event) {
            if (button.value === "Touch Cancel") {
                button.value = "Touch Start";
                _exec("cancel");
            }
            moveEvents[currentIndex] = [];
            currentPoint = event;
            moveEvents[currentIndex].push(event);
            paint = true;
            drawPoints();
            intervalId = setInterval(function () {
                moveEvents[currentIndex].push(currentPoint);
            }, 100);
        }