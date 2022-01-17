function (event) {
            moveEvents[currentIndex] = [];
            currentPoint = event;
            moveEvents[currentIndex].push(event);
            paint = true;
            drawPoints();
            intervalId = setInterval(function () {
                moveEvents[currentIndex].push(currentPoint);
            }, 100);
        }