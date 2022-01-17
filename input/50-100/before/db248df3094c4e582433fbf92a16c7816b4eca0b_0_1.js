function(widget, states)
    {
      var label = widget.getChildControl("label");
      var icon = widget.getChildControl("icon");

      if (states.selected)
      {
        label.setDecorator("selected");
        label.setTextColor("text-selected");
        icon.setDecorator("group");
      }
      else
      {
        label.resetDecorator();
        label.resetTextColor();
        icon.resetDecorator();
      }
    }