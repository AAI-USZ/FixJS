function(tileBounds) {
  return this.minX == tileBounds.minX && tileBounds.maxX == this.maxX &&
      this.minY == tileBounds.minY && tileBounds.minY == this.minY;
}