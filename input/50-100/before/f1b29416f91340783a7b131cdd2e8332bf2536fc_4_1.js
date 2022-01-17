function(options) {

    if ($.isEmptyObject(options.attributes) ||
        !("tdID" in options.attributes) ) {
      this.set({ tdID:  _.uniqueId("tapedeck-track")});
    }
    this.bind("change:download", this.updateCollection);
  }