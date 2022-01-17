function() {
    // add force to target
    if (this.targetX != null)
        this.ax += (this.targetX - this.x) * this.targetForce;

    if (this.targetY != null)
        this.ay += (this.targetY - this.y) * this.targetForce;
}