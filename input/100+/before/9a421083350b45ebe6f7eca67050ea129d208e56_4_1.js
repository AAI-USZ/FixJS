function settings_init() {
    this.loadGaiaCommit();

    var settings = window.navigator.mozSettings;
    var transaction = settings.getLock();

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
      (function(checkbox) {
        var key = checkbox.name;
        if (!key)
          return;

        var request = transaction.get(key);
        request.onsuccess = function() {
          if (request.result[key] != undefined)
            checkbox.checked = !!request.result[key];
        };
      })(checkboxes[i]);
    }

    var radios = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < radios.length; i++) {
      (function(radio) {
        var key = radio.name;
        if (!key)
          return;

        var request = transaction.get(key);
        request.onsuccess = function() {
          if (request.result[key] != undefined)
            radio.checked = (request.result[key] === radio.value);
        };
      })(radios[i]);
    }

    var texts = document.querySelectorAll('input[type="text"]');
    for (var i = 0; i < texts.length; i++) {
      (function(text) {
        var key = text.name;
        if (!key)
          return;

        var request = transaction.get(key);
        request.onsuccess = function() {
          if (request.result[key] != undefined)
            text.value = request.result[key];
        };
      })(texts[i]);
    }

    var progresses = document.querySelectorAll('progress');
    for (var i = 0; i < progresses.length; i++) {
      (function(progress) {
        var key = progress.dataset.name;
        if (!key)
          return;

        var request = transaction.get(key);
        request.onsuccess = function() {
          if (request.result[key] != undefined)
            progress.value = parseFloat(request.result[key]) * 10;
        };
      })(progresses[i]);
    }
  }