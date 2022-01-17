function settings_handleEvent(evt) {
    var input = evt.target;
    var key = input.name || input.dataset.name;
    var settings = window.navigator.mozSettings;
    if (!key || !settings)
      return;

    switch (evt.type) {
      case 'change':
        var value;
        if (input.type === 'checkbox') {
          value = input.checked;
        } else if ((input.type == 'radio') ||
                   (input.type == 'text') ||
                   (input.type == 'password')) {
          value = input.value;
        }
        var cset = {}; cset[key] = value;
        settings.getLock().set(cset);
        break;

      case 'click':
        if (input.tagName.toLowerCase() != 'progress')
          return;
        var rect = input.getBoundingClientRect();
        var position = Math.ceil((evt.clientX - rect.left) / (rect.width / 10));

        var value = position / input.max;
        value = Math.max(0, Math.min(1, value));
        input.value = position;

        var cset = {}; cset[key] = value;
        settings.getLock().set(cset);
        break;
    }
  }