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
      var toolbar = document.getElementById('qunit-testrunner-toolbar');
      if (toolbar) {
        toolbar.appendChild(label1);
        toolbar.appendChild(label2);

        dropdown.selectedIndex = (function() {
          switch (build) {
            case 'prod':         return 1;
            case 'custom':       return 2;
            case 'custom-debug': return 3;
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
      '<input name="norequire" type="checkbox">No RequireJS</label>';

    var label2 = document.createElement('label');
    label2.innerHTML =
      '<select name="build">' +
      '<option value="dev">Developement</option>' +
      '<option value="prod">Production</option>' +
      '<option value="custom">Custom</option>' +
      '<option value="custom-debug">Custom (debug)</option>' +
      '</select> Build';

    var checkbox = label1.firstChild,
        dropdown = label2.firstChild;

    init();
  }