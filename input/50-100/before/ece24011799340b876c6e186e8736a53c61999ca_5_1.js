function(element) {
    element = document.id(element);

    element.addClass('selected');
    var parent = element.getParent('li');
    if (!parent) return;

    var lists = parent.getSiblings().getElements('a.selected');
    Elements.removeClass(lists.flatten(), 'selected');
  }