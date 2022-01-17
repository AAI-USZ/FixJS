function() {
      _.bindAll(this, "render", "sourceChanged");
      this.metricsCollection1 = new collections.Metric({ source: this.model.get("source1")});
      this.metricsCollection2 = new collections.Metric({ source: this.model.get("source2")});
    }