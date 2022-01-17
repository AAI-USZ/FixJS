function(options) {

    if ($.isEmptyObject(options.attributes) ||
        !("tdID" in options.attributes) ) {
      this.set({ tdID:  _.uniqueId("tapedeck-track")});
    }
  }