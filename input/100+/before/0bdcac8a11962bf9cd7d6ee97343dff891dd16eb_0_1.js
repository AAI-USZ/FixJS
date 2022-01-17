function(key, altChars) {
    var content = '', cssWidth = key.scrollWidth;

    var original = altChars[0];
    altChars = altChars.slice(1);

    var altCharsCurrent = [];
    var left = (window.innerWidth / 2 > key.offsetLeft);

    // Place the menu to the left and adds the original key at the end
    if (left) {
      this.menu.classList.add('kbr-menu-left');
      altCharsCurrent.push(original);
      altCharsCurrent = altCharsCurrent.concat(altChars);

    // Place menu on the right and adds the original key at the beginning
    } else {
      this.menu.classList.add('kbr-menu-right');
      altCharsCurrent = altChars.reverse();
      altCharsCurrent.push(original);
    }

    // Build a key for each alternative
    altCharsCurrent.forEach(function(keyChar) {
      var keyCode = keyChar.keyCode || keyChar.charCodeAt(0);
      var dataset = [{'key': 'keycode', 'value': keyCode}];
      var label = keyChar.label || keyChar;
      if (label.length > 1)
        dataset.push({'key': 'compositekey', 'value': label});
      content += buildKey(label, '', cssWidth, dataset);
    });
    this.menu.innerHTML = content;

    // Replace with the container
    _altContainer = document.createElement('div');
    _altContainer.style.display = 'inline-block';
    _altContainer.style.width = key.style.width;
    _altContainer.innerHTML = key.innerHTML;
    _altContainer.className = key.className;
    _altContainer.classList.add("kbr-menu-on");
    _menuKey = key;
    key.parentNode.replaceChild(_altContainer, key);

    // Adjust menu style
    _altContainer
      .querySelectorAll('.visual-wrapper > span')[0]
      .appendChild(this.menu);
    this.menu.style.display = 'block';
  }