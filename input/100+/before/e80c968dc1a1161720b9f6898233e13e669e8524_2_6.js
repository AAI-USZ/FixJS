function init (container) {

        // rch.addEventListener('deviceorientation', function (event) {
        //     console.log(event)
        // });

        for (var i = 20; i--;) {
            $(container).append('<div id="C' + i + '"">div</div>');
        }

        rch.addEventListener('devicemotion', function (event) {
            var threshold = 0.5;

            var left = event.acceleration.x < -threshold;
            var right = event.acceleration.x > threshold;
            var up = event.acceleration.z < -threshold;
            var down = event.acceleration.z > threshold;
            var back = event.acceleration.y < -threshold;
            var forward = event.acceleration.y > threshold;

            console.log(left ? 'left ' : '');

            //console.log(back+","+forward)

            // console.log(event.acceleration.x + ',' + event.acceleration.y + ',' + event.acceleration.z);   
            $('#C' + selected).removeClass('high');
            if (up) {
                selected += 1;
            } else if (down) {
                selected -= 1;
            }
            $('#C' + selected).addClass('high');
        });

        $('#C' + selected).addClass('high');
    }