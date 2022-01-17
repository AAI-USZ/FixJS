function() {
      if (this.collection) {
        this.collection.off();
      }

      this.collection = new collections.Graph({
        targets: this.getTargets(),
        source: this.model.get('source'),
        aggregate_function: this.model.get('aggregate_function') || 'sum',
        from: this.from(),
        to: this.to()
      });

      this.collection.on('reset', this.render);
    }