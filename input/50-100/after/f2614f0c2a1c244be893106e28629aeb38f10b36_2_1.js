function() {
        var self = this;
        return Math.floor((self.sequence.length+self.padding+2)*(1-((self._canvas.width.baseVal.value + self._canvas.currentTranslate.x) / self._canvas.width.baseVal.value)))-1;
    }