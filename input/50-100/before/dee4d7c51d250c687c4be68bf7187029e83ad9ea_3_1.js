function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                this.circle.setPosition(new cc.Point(touches[0].locationInView(0).x, touches[0].locationInView(0).y));
            }
        }
    }