function() {
    function eventHandler(event) {
      var search = location.search.replace(/^\?|&?(?:build|norequire)=[^&]*&?/g, '');
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      location.href =
        location.href.split('?')[0] + '?' +
        (search ? search + '&' : '') + 'build=' +
        dropdown[dropdown.selectedIndex].value +
        (checkbox.checked ? '&norequire=true' : '');
    }

    function init() {
      var header = document.getElementById('qunit-header');
      if (header) {
        header.appendChild(label1);
        header.appendChild(label2);

        dropdown.selectedIndex = (function() {
          switch (build) {
            case 'custom':       return 3;
            case 'custom-debug': return 2;
            case 'prod':         return 1;
          }
          return 0;
        }());
    
        checkbox.checked = norequire;
        addEvent(checkbox, 'click', eventHandler);
        addEvent(dropdown, 'change', eventHandler);
      }
      else {
        setTimeout(init, 15);
      }
    }

    var label1 = document.createElement('label');
    label1.innerHTML =
      '<input name="norequire" type="checkbox">norequire</label>';

    var label2 = document.createElement('label');
    label2.innerHTML =
      '<select name="build">' +
      '<option value="dev">developement</option>' +
      '<option value="prod">production</option>' +
      '<option value="custom-debug">custom (debug)</option>' +
      '<option value="custom">custom</option>' +
      '</select>build';

    var checkbox = label1.firstChild,
        dropdown = label2.firstChild;

    init();
  }