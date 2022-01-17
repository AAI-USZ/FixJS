function(e) {

    var key = e.keyCode;

    if (key == 8 || key == 9) {  // Backspace || Tabulator

      var msg = {

        "type": "terminal",

        "command": "keyEvent",

        "value": key

      };

      IDE.htwg.websocket.sendMessage(msg);

    };

  }