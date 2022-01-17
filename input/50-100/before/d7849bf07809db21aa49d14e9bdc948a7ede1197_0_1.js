function (inSender, inEvent) {
      console.debug("onchange");
      if (this.$.autocompleteMenu.children.length > 0) {
        this.$.nameField.setValue(this.$.autocompleteMenu.children[0].content);
        this.$.autocompleteMenu.children[0].doSelect();
      } else {
        this.$.nameField.setValue("");
      }
      this.$.autocompleteMenu.hide();
      this.render();
    }