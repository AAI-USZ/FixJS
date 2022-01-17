function() {

      // Keep track of the left margin for each element.
      var left = 0;

      // Create the list display.
      if (this.display.length == 0) {
        this.display = this.build_list();
      }

      // Now append the input.
      if (this.input.length == 0) {
        this.display.append(this.build_input(left));
      }

      // Now create the +/- sign if needed.
      if (this.span.length == 0) {
        left += params.colwidth;
        this.display.append(this.build_span(left));
      }

      // Now append the node title.
      if (this.link.length == 0) {
        left += params.colwidth;
        this.display.append(this.build_title(left));
      }

      // Append the children.
      if (this.childlist.length == 0) {
        this.display.append(this.build_children());
      }

      // Return the display.
      return this.display;
    }