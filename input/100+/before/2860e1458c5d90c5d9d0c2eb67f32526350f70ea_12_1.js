function (touches, event) {
        for (var it = 0; it < touches.length; it++) {
            var touch = touches[it];
            var location = touch.locationInView(touch.view());

            location = cc.Director.sharedDirector().convertToGL(location);

            for (var i = 0; i < 3; i++) {
                var node = this.getChildByTag(100 + i);

                var p1 = node.convertToNodeSpaceAR(location);
                var p2 = node.convertToNodeSpace(location);

                cc.Log("AR: x=" + p1.x.toFixed(2) + ", y=" + p1.y.toFixed(2) + " -- Not AR: x=" + p2.x.toFixed(2) + ", y=" + p2.y.toFixed(2));
            }
        }
    }