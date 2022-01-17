function() {

      // Keep track of the left margin for each element.
      var left = 5, elem = null;

      // Create the list display.
      if (this.display.length == 0) {
        this.display = this.build_list();
      }

      // Now append the input.
      if ((this.input.length == 0) &&
          (elem = this.build_input(left)) &&
          (elem.length > 0)) {

        // Add the input to the display.
        this.display.append(elem);
        left += params.colwidth;
      }

      // Now create the +/- sign if needed.
      if (this.span.length == 0) {
        this.display.append(this.build_span(left));
        left += params.colwidth;
      }

      // Now append the node title.
      if (this.link.length == 0) {
        this.display.append(this.build_title(left));
      }

      // Append the children.
      if (this.childlist.length == 0) {
        this.display.append(this.build_children());
      }

      // See if they wish to alter the build.
      if (params.onbuild) {
        params.onbuild(this);
      }

      // Return the display.
      return this.display;
    }