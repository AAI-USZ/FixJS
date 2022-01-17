function(widget, states)
    {
      var label = widget.getChildControl("label");
      var icon = widget.getChildControl("icon");

      if (states.selected)
      {
        label.setBackgroundColor("background-selected");
        label.setTextColor("text-selected");
        icon.setDecorator("white-box");
        icon.setBackgroundColor("background");
      }
      else
      {
        label.resetBackgroundColor();
        label.resetTextColor();
        icon.resetDecorator();
        icon.resetBackgroundColor();
      }
    }