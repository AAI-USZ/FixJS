function(vp) {
        if (vp == pair) {
          console.debug('[Heatmap.hidePairsExcept] revealing pair: ' + pair);
          self.model.hiddenPairs.revealPair(pair);
        }
      }