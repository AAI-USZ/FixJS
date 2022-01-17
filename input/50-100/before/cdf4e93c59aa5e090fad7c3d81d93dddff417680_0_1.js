function(e) {
      Utils.debug("Recieved a drop event ");
      // this / e.target is current target element.
      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }
      
   // Don't do anything if dropping the same object we're dragging.
      if (window.appView.insertUnicodeView.dragSrcEl != this) {
        // add the innerhtml to the target's values
//        window.appView.importView.dragSrcEl.innerHTML = e.target.value;
        e.target.value = e.target.value + window.appView.insertUnicodeView.dragSrcEl.innerHTML;//e.dataTransfer.getData('text/html');
      }
      return false;
    }