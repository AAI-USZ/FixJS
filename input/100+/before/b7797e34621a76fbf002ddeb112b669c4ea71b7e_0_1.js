function () {
        var deviceInfo = require('ripple/devices').getCurrentDevice(),
            canvas = document.getElementById(constants.TOUCHEVENT.CANVAS),
            cxt = canvas.getContext("2d"),
            points = [],
            paint = false,
            currentPoint = {};

        function drawPoints() {
            var key, index, points = [], point;

            for (key in moveEvents) {
                points = moveEvents[key];
                cxt.fillStyle = colors[key];

                for (index = 0; index < points.length; index++) {
                    point = points[index];
                    cxt.beginPath();
                    cxt.arc(point.offsetX, point.offsetY, 5, 0, 2 * Math.PI, 1);
                    cxt.fill();
                }
            }
        }

        function endDraw(event) {
            if (paint) {
                paint = false;
                clearInterval(intervalId);
                moveEvents[currentIndex].push(event);
                drawPoints();

                currentIndex++;
                if (currentIndex === 5)
                    currentIndex = 0;
            }
        }

        canvas.addEventListener("mousedown", function (event) {
            moveEvents[currentIndex] = [];
            currentPoint = event;
            moveEvents[currentIndex].push(event);
            paint = true;
            drawPoints();
            intervalId = setInterval(function () {
                moveEvents[currentIndex].push(currentPoint);
            }, 100);
        });

        canvas.addEventListener("mousemove", function (event) {
            if (paint) {
                currentPoint = event;
                drawPoints();
            }
        });

        canvas.addEventListener("mouseup", endDraw);
        canvas.addEventListener("mouseout", endDraw);
        canvas.addEventListener("mouseleave", endDraw);

        document.getElementById(constants.TOUCHEVENT.OPTION).addEventListener("click", function () {
            if (!moveEvents[0])
                return;

            if (this.value === "Touch Start") {
                this.value = "Touch Cancel";
                _exec("start");
            } else if (this.value === "Touch Cancel") {
                this.value = "Touch Start";
                _exec("cancel");
            }
        }, false);

        canvas.width = deviceInfo.screen.width / enlargeRatio;
        canvas.height = deviceInfo.screen.height / enlargeRatio;
    }