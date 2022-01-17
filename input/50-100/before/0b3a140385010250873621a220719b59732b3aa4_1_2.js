function() {
        that.$targetInput.select2({ tags: collections.metrics.autocomplete_names() });
        that.$targetInput2.select2({ tags: collections.metrics.autocomplete_names() });
      }