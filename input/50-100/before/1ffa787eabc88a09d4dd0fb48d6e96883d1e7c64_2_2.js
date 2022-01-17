function() {
    // add force to target
    if (this.targetX != null)
        this.ax += (this.x - this.targetX) * this.targetForce;

    if (this.targetY != null)
        this.ay += (this.y - this.targetY) * this.targetForce;
}