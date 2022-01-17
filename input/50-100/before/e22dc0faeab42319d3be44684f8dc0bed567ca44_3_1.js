function(length) {
    if (typeof length === 'undefined') {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    this.normalize();
    this.x *= length;
    this.y *= length;
}