function(options) {
      Utils.debug("DATALIST init: " + this.el);
      
      // Create a DatumView
      if (options.datumCollection) {
        this.datumsView = new UpdatingCollectionView({
          collection           : options.datumCollection,
          childViewConstructor : DatumReadView,
          childViewTagName     : "li",
          childViewFormat      : "latex"
        });
      }
    }