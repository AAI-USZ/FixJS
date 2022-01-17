function() {
      // Create a AudioVideoEditView
      this.audioVideoView = new AudioVideoEditView({
        model : this.model.get("audioVideo"),
      });
      
      // Create a DatumTagView
      this.datumTagsView = new UpdatingCollectionView({
        collection           : this.model.get("datumTags"),
        childViewConstructor : DatumTagEditView,
        childViewTagName     : "li",
      });

      // Create the DatumFieldsValueEditView
      this.datumFieldsView = new UpdatingCollectionView({
        collection           : this.model.get("datumFields"),
        childViewConstructor : DatumFieldEditView,
        childViewTagName     : "li",
        childViewClass   : "datum-field",
        childViewFormat      : "datum"
      });
    }