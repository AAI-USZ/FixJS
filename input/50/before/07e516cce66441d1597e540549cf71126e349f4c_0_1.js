function (event, pos, item) {
    if (!item) return;
    show_tooltip(item.pageX + 10, item.pageY, generate_tooltip(item));
  }