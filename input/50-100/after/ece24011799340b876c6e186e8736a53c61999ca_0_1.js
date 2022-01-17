function() {
      var stackName = this.getStack().getName();
      UI.highlight(document.getElement('footer .' + stackName));
    }