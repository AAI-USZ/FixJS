function (event) {
            //var dir = rch.getDirection(event.angle);
            var rotation = event.rotation;
            var deg = rotation < 0 ? 180 + (rotation * -1) : rotation;
            console.log('pinch ' + deg);
            $(selectedPhoto).css('-webkit-transform', 'rotate(' + deg + 'deg)');
        }