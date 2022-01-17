function(delta) {
        var parentX = this.parent ? this.parent.x : 0;
        var parentY = this.parent ? this.parent.y : 0;
        var radianAngle = (this.angle + this.angleOffset) * (Math.PI / 180);
        var size = this.getSize();
        if (this.speedType === Entity.speedTypes.POLAR) {
            this.xSpeed = this.speed * Math.cos(radianAngle);
            this.ySpeed = this.speed * Math.sin(radianAngle);
        }
        this.x += this.xSpeed * delta * 50;
        this.y -= this.ySpeed * delta * 50;
        if (this.model) {
            this.model.rotation = (Math.PI * 2) - radianAngle;
            this.model.position.x = this.x + parentX;
            this.model.position.y = this.y + parentY;
            var ratio = this.model.map.image.width / this.model.map.image.height;
            this.model.scale.x = this.xScale * ratio;
            this.model.scale.y = this.yScale;
        }
        if (!this.disableTasks && this.tasks) {
            this.tasks.update(delta, this);
        }
    }