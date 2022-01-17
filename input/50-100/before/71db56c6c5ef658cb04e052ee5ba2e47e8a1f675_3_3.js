function(e) {
      // Target (this) element is the source node.
      this.classList.add("halfopacity");
      window.appView.insertUnicodeView.dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }