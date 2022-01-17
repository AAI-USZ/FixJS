function(index){
        this.addEventListener('drop', window.appView.dragUnicodeToField, false);
        this.addEventListener('dragover', window.appView.handleDragOver, false);
      }