function km_hideAlternativesCharMenu() {
    this.menu = document.getElementById('keyboard-accent-char-menu');
    this.menu.innerHTML = '';
    this.menu.className = '';
    this.menu.style.display = 'none';

    if (_altContainer)
      _altContainer.parentNode.replaceChild(_menuKey, _altContainer);
  }