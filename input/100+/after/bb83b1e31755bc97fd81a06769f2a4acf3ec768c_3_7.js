function (container) {
        $(container).append('<h1>Low-level Event Test</h1>\
            <div class="left">\
                <table>\
                    <tr>\
                        <th>Current&nbsp;Gesture</th>\
                        <th id="Gesture">(none)</th>\
                    </tr>\
                    <tr>\
                        <td style="padding-top:20px">Last Event type</td>\
                        <td style="padding-top:20px;width:200px" id="EventType"></td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" id="Values" style="vertical-align:top;padding-top:30px"></td>\
                    </tr>\
                </table>\
                <div style="margin-top:30px" id="EventList"></div>\
            </div>\
            <div class="right">\
                <div id="DeviceOrientationEvent"></div>\
                <div style="margin-top:30px" id="DeviceMotionEvent"></div>\
            </div>');

        this.addEventListener('rcjs:singletap', function (event) {
            $('<div>Single-Tap</div>').appendTo($('#EventList'));
        });

        this.addEventListener('rcjs:doubletap', function (event) {
            $('<div>Double-Tap</div>').appendTo($('#EventList'));
        });

        this.addEventListener('rcjs:singletouchstart', function (event) {
            print('singletouch', 'rcjs:pinchstart', event);
        });

        this.addEventListener('rcjs:singletouchmove', function (event) {
            print('singletouch', 'rcjs:singletouchmove', event);
        });

        this.addEventListener('rcjs:singletouchend', function (event) {
            print(null, 'rcjs:singletouchend', event);
            $('<div>Single-Touch</div>').appendTo($('#EventList'));
        });

        this.addEventListener('rcjs:pinchstart', function (event) {
            print('pinch', 'rcjs:pinchstart', event);
        });

        this.addEventListener('rcjs:pinch', function (event) {
            print('pinch', 'rcjs:pinch', event);
        });

        this.addEventListener('rcjs:pinchend', function (event) {
            print(null, 'rcjs:pinchend', event);
            $('<div>Pinch</div>').appendTo($('#EventList'));
        });

        this.addEventListener('rcjs:swipestart', function (event) {
            print('swipe', 'rcjs:swipestart', event);
        });

        this.addEventListener('rcjs:swipe', function (event) {
            print('swipe', 'rcjs:swipe', event);
        });

        this.addEventListener('rcjs:swipeend', function (event) {
            print(null, 'rcjs:swipeend', event);
            var dir = rch.getDirection(event.angle),
                name = 'Swipe ' + dir;
            $('<div>' + name + '</div>').appendTo($('#EventList'));
        });

        this.addEventListener('devicemotion', function (event) {
            var table = '<table>\
            <tr><th>Device Motion</th></tr>\
            <tr><td class="sub">acceleration</td></tr>\
            <tr><td>' + printTable(event.acceleration) + '</td></tr>\
            <tr><td class="sub">accelerationIncludingGravity</td></tr>\
            <tr><td>' + printTable(event.accelerationIncludingGravity) + '</td></tr>\
            <tr><td class="sub">rotationRate</td></tr>\
            <tr><td>' + printTable(event.rotationRate) + '</td></tr>\
            </table';
            $('#DeviceMotionEvent').empty().append(table);
        });

        this.addEventListener('deviceorientation', function (event) {
            var table = '<table>\
            <tr><th>Device Orientation</th></tr>\
            <tr><td>' + printTable(event) + '</td></tr>\
            </table';
            $('#DeviceOrientationEvent').empty().append(table);
            //$('.Scenario5 .orientationplane').show();
            // var transform = 'rotateX(' + b + 'deg) rotateY(' + c + 'deg) rotate(' + a + 'deg)';
            // console.log(a+","+b+","+c);
            // $('.Scenario5 .orientationplane > div').css('-webkit-transform', transform);
        });

        function format(val, digits) {
            if (val instanceof Array) {
                if (val.length === 0) return '-'; else return val.toString();
            } else {
                digits = Math.pow(10, digits);
                return Math.round(val * digits) / digits;
            }
        }

        function printTable (obj, digits) {
            digits = digits || 5;
            var t = '<table class="smalldata">';
            for (prop in obj) {
                if (prop === 'type') { continue; }
                //if (obj[prop] instanceof Array) { continue; }
                t += '<tr><td>' + prop + '</td><td>' + format(obj[prop], digits) + '</td></tr>'
            }
            return t += '</table>';
        }

        function print (gesture, type, obj) {
            gesture = gesture || '(none)';
            $('#Gesture').empty().append(gesture);
            $('#EventType').empty().append(type);
            $('#Values').empty().append(printTable(obj));
        }

        // rch.emitEvent('rcjs:singletouchend', {
        //     clientX: Math.random(),
        //     clientY: Math.random(),
        //     touches: [],
        //     changedTouches: []
        // })

        // rch.emitEvent('devicemotion', {
        //     acceleration: {
        //         x: Math.random(),
        //         y: Math.random(),
        //         z: Math.random()
        //     },
        //     accelerationIncludingGravity: {
        //         x: Math.random(),
        //         y: Math.random(),
        //         z: Math.random()
        //     },
        //     rotationRate: {
        //         alpha: Math.random(),
        //         beta: Math.random(),
        //         gamma: Math.random()
        //     }
        // });
        // rch.emitEvent('deviceorientation', {
        //     alpha: Math.random(),
        //     beta: Math.random(),
        //     gamma: Math.random()
        // });
    }