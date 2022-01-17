function(e) {
      Utils.debug("Recieved a drop event ");
      // this / e.target is current target element.
      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }
      
      //if it's a unicode dragging event
      if(window.appView.insertUnicodesView.dragSrcEl != null){
        // Don't do anything if dropping the same object we're dragging.
        if (window.appView.insertUnicodesView.dragSrcEl != this) {
          // add the innerhtml to the target's values
          //if you want to flip the innerHTML of the draggee to the dragger
          //window.appView.importView.dragSrcEl.innerHTML = e.target.value;
          e.target.value = e.target.value + window.appView.insertUnicodesView.dragSrcEl.innerHTML;//e.dataTransfer.getData('text/html');
          //say that the unicode drag event has been handled
          window.appView.insertUnicodesView.dragSrcEl = null;
        }
        return false;
      }
    }