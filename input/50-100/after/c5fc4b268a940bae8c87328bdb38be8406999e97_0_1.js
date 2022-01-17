function() {
      Utils.debug("SESSION init: " + this.el);

      this.sessionFieldsView = new UpdatingCollectionView({
        collection           : this.model.get("sessionFields"),
        childViewConstructor : DatumFieldEditView,
        childViewTagName     : "li",
        childViewFormat      : "session"
      });
      
      this.model.bind('change', this.showEditable, this);
    }