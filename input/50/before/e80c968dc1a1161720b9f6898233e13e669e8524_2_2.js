function (event) {
            var dir = rch.getDirection(event.angle);
            $(target).css('background-color' , 'hsl(' + event.angle + ', 100%, 50%)');

        }