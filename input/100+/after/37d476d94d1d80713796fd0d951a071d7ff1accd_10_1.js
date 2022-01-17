function() {
      Utils.debug("SEARCH init: " + this.el);
      
      this.advancedSearchDatumView = new UpdatingCollectionView({
        collection           : window.app.get("corpus").get("datumFields").clone(),
        childViewConstructor : DatumFieldEditView,
        childViewTagName     : 'li',
        childViewFormat      : "datum"
      });
      
      this.advancedSearchSessionView = new UpdatingCollectionView({
        collection           : window.app.get("corpus").get("sessionFields").clone(),
        childViewConstructor : DatumFieldEditView,
        childViewTagName     : 'li',
        childViewFormat      : "session"
      });
      
      this.model.bind('change', this.render, this);
    }