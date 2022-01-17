function(windowPosition) {
        var width = this._canvas.clientWidth;
        var height = this._canvas.clientHeight;

        var x = (2.0 / width) * windowPosition.x - 1.0;
        x *= (this.frustum.right - this.frustum.left) * 0.5;
        var y = (2.0 / height) * (height - windowPosition.y) - 1.0;
        y *= (this.frustum.top - this.frustum.bottom) * 0.5;

        var position = this.getPositionWC().clone();
        position.x += x;
        position.y += y;

        return new Ray(position, this.getDirectionWC());
    }