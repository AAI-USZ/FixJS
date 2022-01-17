function() {
      var stack = this.getStack();
      var previous = stack && stack.getPrevious();
      if (previous)
        previous.toElement().getElements('ul li a.selected').removeClass('selected');
    }