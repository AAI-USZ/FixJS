function(min, max) {
        this.cutoff(min, max);
        return this.chart.draw(this.data(), this.mergedOptions());
      }