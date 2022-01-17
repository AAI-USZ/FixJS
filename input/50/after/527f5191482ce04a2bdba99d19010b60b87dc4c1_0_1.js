function() {
    var section = this.innerHTML;
    history.pushState({section: section}, '', '#'+section);
    show_section(section);
  }