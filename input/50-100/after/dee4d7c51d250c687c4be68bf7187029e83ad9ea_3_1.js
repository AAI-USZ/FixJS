function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                this.circle.setPosition(new cc.Point(touches[0].locationInView().x, touches[0].locationInView().y));
            }
        }
    }