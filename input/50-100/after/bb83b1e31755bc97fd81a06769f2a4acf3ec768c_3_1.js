function (event) {
            print(null, 'rcjs:swipeend', event);
            var dir = rch.getDirection(event.angle),
                name = 'Swipe ' + dir;
            $('<div>' + name + '</div>').appendTo($('#EventList'));
        }