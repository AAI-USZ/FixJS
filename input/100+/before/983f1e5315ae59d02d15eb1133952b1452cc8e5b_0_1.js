function(event) {
      // TODO Implement it with building blocks:
      // https://github.com/jcarpenter/Gaia-UI-Building-Blocks/blob/master/inprogress/tabs.css
      // https://github.com/jcarpenter/Gaia-UI-Building-Blocks/blob/master/inprogress/tabs.html

      var option_recent = document.getElementById('option-recents');
      var option_contacts = document.getElementById('option-contacts');
      var option_keypad = document.getElementById('option-keypad');

      option_recent.classList.remove('toolbar-option-selected');
      option_contacts.classList.remove('toolbar-option-selected');
      option_keypad.classList.remove('toolbar-option-selected');

      var destination = window.location.hash;
      switch (destination) {
        case '#recents-view':
          option_recent.classList.add('toolbar-option-selected');
          break;
        case '#contacts-view':
          option_contacts.classList.add('toolbar-option-selected');
          break;
        case '#keyboard-view':
          option_keypad.classList.add('toolbar-option-selected');
          break;
      }
    }