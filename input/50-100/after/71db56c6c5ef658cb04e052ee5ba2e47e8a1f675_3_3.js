function(e) {
      // Target (this) element is the source node.
      this.classList.remove("halfopacity");
//      var u = window.app.get("authentication").get("userPrivate").get("prefs").get("unicodes").where({symbol: this.innerHTML});
      //TODO useCount++ increase the user count on that item.
      
      //if not already dragging, do a drag start
      if(window.appView.insertUnicodesView.dragSrcEl == null){
        window.appView.insertUnicodesView.dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
      }
    }