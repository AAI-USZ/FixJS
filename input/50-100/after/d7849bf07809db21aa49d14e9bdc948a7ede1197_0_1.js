function (inSender, inEvent) {
      /*
      FIXME here's a curious bug: I want to monitor when the user leaves this widget
      so that we can (1) select the top menu option if it wasn't picked, or (2) clear
      out the field if there's no valid match. The problem is that if the user wants
      to select a value from the options, that fires this event first! And so the
      event of actually picking an option never happens.
      if (this.$.autocompleteMenu.children.length > 0) {
        this.$.nameField.setValue(this.$.autocompleteMenu.children[0].content);
        this.$.autocompleteMenu.children[0].doSelect();
      } else {
        this.$.nameField.setValue("");
      }
      this.$.autocompleteMenu.hide();
      this.render();
      */
    }