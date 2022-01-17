function() {
    this.inherited(arguments);

    // note: this can't go in setupConnections because the component has not
    // yet been assigned a region then
    if (this.region.numComponents() === 1) {
      // this.scrollKeeper = dojo.subscribe('/content/update', dojo.hitch(this, function(event) {
      //   this.region.showElement('.current', '0ms');
      // }));
    }
  }