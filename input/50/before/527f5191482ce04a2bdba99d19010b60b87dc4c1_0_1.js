function() {
    var section = this.className;
    history.pushState({section: section}, '', '#'+section);
    show_section(section);
  }