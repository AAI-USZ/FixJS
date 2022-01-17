function(event, target)

  {

    for (var key in window.ui_strings) {

      window.ui_strings[key] = "# " + key + " #";

    }

    client.setup();

  }