function (event, pos, item) {
    if (!item) {
      $("#hover_tooltip").remove();
      previousPoint = null;
    } else if (previousPoint != item.dataIndex) {
      previousPoint = item.dataIndex;
      $("#hover_tooltip").remove();
      var contents = generate_tooltip(item, "hover_tooltip");
      show_tooltip(item.pageX + 10, item.pageY, contents);
    }
  }