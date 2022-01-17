function() {
      var stack = this.getStack();
      var previous = stack && stack.getPrevious();
      if (!stack || !previous) return;

      previous.toElement().getElements('ul li a.selected').removeClass('selected');
    }