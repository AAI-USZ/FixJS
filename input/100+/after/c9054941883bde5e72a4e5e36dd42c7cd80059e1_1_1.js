function(points) {
            // Bound a number by 1e-6 and 1e20 to avoid exponents after toString
            function boundNumber(num) {
                if (num === 0) {
                    return num;
                } else if (num < 0) {
                    return -boundNumber(-num);
                } else {
                    return Math.max(1e-6, Math.min(num, 1e20));
                }
            }

            return $.map(points, function(point, i) {
                if (point === true) {
                    return "z";
                } else {
                    var scaled = scalePoint(point);
                    return (i === 0 ? "M" : "L") + boundNumber(scaled[0]) + " " + boundNumber(scaled[1]);
                }
            }).join("");
        }