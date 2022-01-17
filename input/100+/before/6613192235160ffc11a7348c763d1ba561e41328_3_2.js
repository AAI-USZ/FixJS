function(other, epsilon) {
        epsilon = epsilon || 0.0;
        return (Math.abs(this.x - other.x) <= epsilon) &&
               (Math.abs(this.y - other.y) <= epsilon) &&
               (Math.abs(this.z - other.z) <= epsilon) &&
               (Math.abs(this.w - other.w) <= epsilon);
    }