function() {
      var that = this;
      if (!collections.metrics.isFetched) {
        collections.metrics.fetch({ success: that.prefillAutocomplete });
        return;
      }
      this.$targetInput1.select2({ tags: collections.metrics.autocomplete_names() });
      this.$targetInput2.select2({ tags: collections.metrics.autocomplete_names() });
    }