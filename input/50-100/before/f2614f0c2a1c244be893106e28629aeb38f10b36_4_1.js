function() {
        var self = this;
        return 20+self.sequence.length*(1-((self._canvas.width.baseVal.value + self._canvas.currentTranslate.x) / self._canvas.width.baseVal.value));
    }