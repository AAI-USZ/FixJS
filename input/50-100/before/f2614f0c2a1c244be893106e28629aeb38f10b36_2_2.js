function() {
        var self = this;
        return self.leftVisibleResidue() + self.sequence.length*(self._container_canvas.width.baseVal.value / self._canvas.width.baseVal.value);
    }