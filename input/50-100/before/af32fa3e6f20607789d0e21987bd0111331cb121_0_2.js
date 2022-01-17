function(pair) {
      try {
        console.debug('[Heatmap.hidePairsExcept] hiding pair: ' + pair);
        self.model.hiddenPairs.hidePair(pair);
      } catch (e) {}
      _.each(visiblePairs, function(vp) {
        if (vp == pair) {
          console.debug('[Heatmap.hidePairsExcept] revealing pair: ' + pair);
          self.model.hiddenPairs.revealPair(pair);
        }
      });
    }