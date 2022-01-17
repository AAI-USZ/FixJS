function(event) {
      // TODO Implement it with building blocks:
      // https://github.com/jcarpenter/Gaia-UI-Building-Blocks/blob/master/inprogress/tabs.css
      // https://github.com/jcarpenter/Gaia-UI-Building-Blocks/blob/master/inprogress/tabs.html

      var recent = document.getElementById('option-recents');
      var contacts = document.getElementById('option-contacts');
      var keypad = document.getElementById('option-keypad');

      recent.classList.remove('toolbar-option-selected');
      contacts.classList.remove('toolbar-option-selected');
      keypad.classList.remove('toolbar-option-selected');

      var destination = window.location.hash;
      switch (destination) {
        case '#recents-view':
          recent.classList.add('toolbar-option-selected');
          break;
        case '#contacts-view':
          contacts.classList.add('toolbar-option-selected');
          break;
        case '#keyboard-view':
          keypad.classList.add('toolbar-option-selected');
          break;
      }
    }