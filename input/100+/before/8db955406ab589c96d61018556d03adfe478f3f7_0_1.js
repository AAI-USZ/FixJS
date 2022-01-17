function Splines(newData,rate) {
            var arrPoints = []

            for (var i = 0; i < newData.length; ++i) {
                var cntElements = newData.length
                var P1x,P1y,P4x,P4y 

                if (i < 1) {
                    P1x = newData[0]
                    P1y = newData[1]
                } else {
                    P1x = newData[i-2]
                    P1y = newData[i-1]
                }

                var P2x = newData[i]
                var P2y = newData[i+1]

                var P3x = newData[i+2]
                var P3y = newData[i+3]

                if (i < cntElements - 4) {
                    P4x = newData[i+4]
                    P4y = newData[i+5]
                } else {
                    P4x = newData[i-2]
                    P4y = newData[i-1]
                }

                for (var j = 1; j < 100 + 1; j++) {
                    var t = j * 0.01;

                    var x = rate * ( -t * t * t + 2 * t * t - t) * P1x + rate * ( -t * t * t + t * t) * P2x + (2 * t * t * t - 3 * t * t + 1) * P2x + rate * (t * t * t - 2 * t * t + t) * P3x + ( -2 * t * t * t + 3 * t * t) * P3x + rate * (t * t * t - t * t) * P4x
                    var y = rate * ( -t * t * t + 2 * t * t - t) * P1y + rate * ( -t * t * t + t * t) * P2y + (2 * t * t * t - 3 * t * t + 1) * P2y + rate * (t * t * t - 2 * t * t + t) * P3y + ( -2 * t * t * t + 3 * t * t) * P3y + rate * (t * t * t - t * t) * P4y;

                    if(x >= 0 && y >= 0) {
                        if (options.xaxis.mode == 'time') { x = parseInt(x) }
                        arrPoints.push(x,y)
                    }
                }

                i++
            }
            
            return arrPoints
        }