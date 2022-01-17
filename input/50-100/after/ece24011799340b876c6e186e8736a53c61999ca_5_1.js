function(element) {
    element = document.id(element);
    if (!element || this.isHighlighted(element)) return;

    element.addClass('selected');
    var parent = element.getParent('li');
    if (!parent) return;

    var lists = parent.getSiblings().getElements('a.selected');
    Elements.removeClass(lists.flatten(), 'selected');
  }