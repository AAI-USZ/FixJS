function(e) {
      // Target (this) element is the source node.
      this.classList.add("halfopacity");

      //if not already dragging, do a drag start
      if(window.appView.insertUnicodesView.dragSrcEl == null){
        window.appView.insertUnicodesView.dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
      }

    }