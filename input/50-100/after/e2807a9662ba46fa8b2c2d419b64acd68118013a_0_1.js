function(selection) {
      if (selection == undefined)
        this.selection = Meta_Object.create();
      else
        this.selection = selection;
      
      for (var x = 0; x < this.children.length; x++) {
        List.make_item_selectable(this, this.children[x], selection);
      }
    }