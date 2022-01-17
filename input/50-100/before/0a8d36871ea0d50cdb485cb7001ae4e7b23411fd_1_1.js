function(pane)
   {
     this.getPopup().add(pane);
     this.getPopup().setAnchor(this.__right.getChildren()[0]._getBackButton());
     this.getPopup().show();
   }