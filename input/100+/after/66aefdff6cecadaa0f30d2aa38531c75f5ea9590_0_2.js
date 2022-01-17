function(items, total) {
        var hasMore, hf, summary;
        this.throbber.remove();
        summary = items[0];
        if (summary.item != null) {
          if (items.length > 1) {
            hasMore = items.length < this.limit ? false : total > this.limit;
            this.paper.remove();
            hf = new HistoFacet(this.query, this.facet, items, hasMore, "");
            this.$el.append(hf.el);
            return hf.render();
          } else {
            return this.$el.empty().append(intermine.snippets.facets.OnlyOne(summary));
          }
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