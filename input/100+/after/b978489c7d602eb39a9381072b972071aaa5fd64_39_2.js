function (touches, event) {

        var touch;

        if (touches.length <= 0)
            return;

        for (var i = 0; i < touches.length; i++) {
            touch = touches[i];

            if (!touch) {
                break;
            }
            var a = touch.locationInView();
            var director = cc.Director.sharedDirector();
            var b = director.convertToUI(director.convertToGL(a));
            cc.Log("(" + a.x + "," + a.y + ") ==( " + b.x + "," + b.y + ")");
        }

    }