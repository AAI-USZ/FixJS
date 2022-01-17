function (touches, event) {
        for (var it = 0; it < touches.length; it++) {
            var touch = touches[it];

            if (!touch)
                break;

            var location = touch.locationInView();
            //location = cc.Director.sharedDirector().convertToGL(location);
            this.addNewSpriteWithCoords(location);
        }
    }