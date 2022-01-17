function(key, keyboards, current, switchCode) {
    var dataset, className, content = '';
    var menu = this.menu;

    var cssWidth = key.style.width;
    menu.classList.add('kbr-menu-lang');
    key.classList.add('kbr-menu-on');

    var alreadyAdded = {};
    for (var i = 0, kbr; kbr = keyboards[i]; i += 1) {
      if (alreadyAdded[kbr])
        continue;

      className = 'keyboard-key';
      if (kbr === current)
        className += ' kbr-key-hold';

      dataset = [
        {key: 'keyboard', value: kbr},
        {key: 'keycode', value: switchCode}
      ];
      content += buildKey(
        Keyboards[kbr].menuLabel,
        className, cssWidth,
        dataset
      );

      alreadyAdded[kbr] = true;
    }
    menu.innerHTML = content;

    // Replace with the container
    _altContainer = document.createElement('div');
    _altContainer.style.display = 'inline-block';
    _altContainer.style.width = key.style.width;
    _altContainer.innerHTML = key.innerHTML;
    _altContainer.className = key.className;
    _menuKey = key;
    key.parentNode.replaceChild(_altContainer, key);

    _altContainer
      .querySelectorAll('.visual-wrapper > span')[0]
      .appendChild(menu);
    menu.style.display = 'block';
  }