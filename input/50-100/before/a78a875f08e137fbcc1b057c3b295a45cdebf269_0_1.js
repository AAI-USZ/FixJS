function init() {
      var header = document.getElementById('qunit-header');
      if (header) {
        header.appendChild(label1);
        header.appendChild(label2);

        if (build == 'prod') {
          dropdown.selectedIndex = 1;
        } else if (build == 'custom') {
          dropdown.selectedIndex = 2;
        }
        checkbox.checked = norequire;
        addEvent(checkbox, 'click', eventHandler);
        addEvent(dropdown, 'change', eventHandler);
      }
      else {
        setTimeout(init, 15);
      }
    }