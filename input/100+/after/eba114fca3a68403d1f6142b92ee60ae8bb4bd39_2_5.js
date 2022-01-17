function() {
      var deselect_trigger;
      deselect_trigger = this.selected_item.down("abbr");
      if (deselect_trigger) return deselect_trigger.remove();
    }