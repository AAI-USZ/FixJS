function (event, pos, item) {
    if (!item) return;
    show_tooltip(graph, item.pageX + 10, item.pageY, generate_tooltip(item));
  }