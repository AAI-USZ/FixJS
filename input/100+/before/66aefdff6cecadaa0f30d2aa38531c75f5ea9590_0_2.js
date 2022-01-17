function(items) {
        var summary;
        summary = items[0];
        if (summary.item != null) {
          return this.$el.empty().append(intermine.snippets.facets.OnlyOne(summary));
        }
        this.mean = parseFloat(summary.average);
        this.dev = parseFloat(summary.stdev);
        this.max = summary.max;
        this.min = summary.min;
        if (summary.count != null) {
          this.drawChart(items);
        } else {
          this.drawCurve();
        }
        this.drawStats();
        return this.drawSlider();
      }