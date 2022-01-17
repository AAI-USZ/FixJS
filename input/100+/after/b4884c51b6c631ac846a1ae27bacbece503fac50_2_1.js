function() {
    var size = this.getSize(),
       quality = this.getQuality(),
       position = this.getPosition(),
       rquality = this.relativeQuality_ || 1,
       enable3d = this.getCSS3DTransformsAllowed();

    if (this.transitionsActive_[lime.Transition.POSITION]) {
        position = this.transitionsActive_[lime.Transition.POSITION];
    }

    var width = Math.round(size.width * rquality);
    var height = Math.round(size.height * rquality);

    var realScale = this.getScale().clone();
    if (this.transitionsActive_[lime.Transition.SCALE]) {
        realScale = this.transitionsActive_[lime.Transition.SCALE].clone();
    }
    if (width != 0) realScale.scale(size.width / (width * quality / rquality));
    else realScale.scale(1 / quality);

    lime.style.setSize(this.domElement, width, height);

    lime.style.setTransformOrigin(this.domElement,
        this.anchorPoint_.x * 100, this.anchorPoint_.y * 100, true);


    var ax = this.anchorPoint_.x * size.width * rquality;
    var ay = this.anchorPoint_.y * size.height * rquality;

    var px = position.x * rquality / quality - ax,
        py = position.y * rquality / quality - ay;

    var so = this.stroke_ ? this.stroke_.width_ : 0;

    if (((ax-so) != 0 || (ay-so) != 0) && this.domElement == this.containerElement &&
            this.children_.length) {
        lime.Renderer.DOM.makeContainer.call(this);
    }


    if (this.domElement != this.containerElement) {
        if (!this.transitionsActiveSet_[lime.Transition.POSITION] && !this.transitionsActiveSet_[lime.Transition.SCALE] && !this.transitionsActiveSet_[lime.Transition.ROTATION])
        lime.style.setTransform(this.containerElement,
                new lime.style.Transform().set3d(enable3d)
                    .translate(ax-so, ay-so));
    }

    if (this.mask_ != this.activeMask_) {
        if (this.activeMask_) {
            lime.Renderer.DOM.removeMask.call(this);
        }

        if (this.mask_) {
            lime.Renderer.DOM.addMask.call(this);
        }
    }

    var transform = new lime.style.Transform()
        .setPrecision(0.1)
        .set3d(enable3d);

    if (this.mask_) {
        lime.Renderer.DOM.calculateMaskPosition.call(this.mask_);
        transform.setPrecision(0.1)
            .translate(-this.mask_.mX - ax, -this.mask_.mY - ay)
            .rotate(this.mask_.mRot, 'rad').translate(ax, ay).setPrecision(1);
    }

    var rotation = -this.getRotation();
    if (goog.isDef(this.transitionsActive_[lime.Transition.ROTATION])) {
        rotation = -this.transitionsActive_[lime.Transition.ROTATION];
    }

    transform.translate(px, py).scale(realScale.x, realScale.y).
        rotate(rotation);

    if (!this.transitionsActiveSet_[lime.Transition.POSITION] && !this.transitionsActiveSet_[lime.Transition.SCALE] && !this.transitionsActiveSet_[lime.Transition.ROTATION]) {
       //     console.log('transform',this.transition_position_set_,this.transition_position_);
        lime.style.setTransform(this.domElement, transform);
    }

}