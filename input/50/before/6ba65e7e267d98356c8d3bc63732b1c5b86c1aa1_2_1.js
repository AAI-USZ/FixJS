function() {
      _.bindAll(this, "render", "sourceChanged");

      // TODO: why is graph.js setting the source of metrics collection?
      collections.metrics.source = this.model.get('source') || $.Sources.getDefaultTarget();
    }