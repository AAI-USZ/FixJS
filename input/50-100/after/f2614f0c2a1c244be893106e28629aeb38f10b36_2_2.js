function() {
        var self = this;
        return Math.floor(self.leftVisibleResidue() + (self.sequence.length+self.padding+2)*(self._container_canvas.parentNode.getBoundingClientRect().width / self._canvas.width.baseVal.value));
    }