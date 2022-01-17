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
      
      // Create a CommentEditView     
      this.commentEditView = new UpdatingCollectionView({
        collection           : this.model.get("comments"),
        childViewConstructor : CommentEditView,
        childViewTagName     : 'li'
      });

      this.model.bind("change", this.showEditable, this);
    }