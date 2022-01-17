function md_init() {
    // Get all elements initially.
    this.getAllElements();
    var elements = this.elements;

    // Bind events
    window.addEventListener('mozbrowsershowmodalprompt', this);

    for (var id in elements) {
      if (elements[id].tagName.toLowerCase() == 'button') {
        elements[id].addEventListener('click', this);
      }
    }
  }