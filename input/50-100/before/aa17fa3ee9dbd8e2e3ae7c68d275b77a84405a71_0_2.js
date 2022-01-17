function() {
      if (this.secondaryCollection) {
        this.secondaryCollection.off();
      }

      this.secondaryCollection = new collections.Graph({
        time: this.model.get('time'),
        targets: this.getTargets(),
        source: this.model.get('source'),
        aggregate_function: this.model.get('aggregate_function') || 'sum',
        from: this.previousFrom(),
        to: this.to()
      });
    }