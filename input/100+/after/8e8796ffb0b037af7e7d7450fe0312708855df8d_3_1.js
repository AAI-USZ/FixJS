f    if (!keys) {
      return;
    }
    var key = null;
    var last_times = null;

    if (e) {
      key = getKey(e);
    }

    // when run last command, fix run time.
    if (key == '.' && !insertMode) {
      last_times = Settings.get('background.times');
      times = (last_times || 1) * (times || 1);
    } else {
      last_times = times;
    }

    for (var i = 0; i < bindings.length; i++) {
      // 0 is a special command. could be used to scroll left, also could be used as run count.
      if (times > 0 && keys.match(/^\d$/)) {
        break
      }

      var binding = bindings[i];
      var binding_command = binding[0];
      var binding_function = binding[1];
      var binding_mode = binding[2]; // insert mode or not
      var escaped_command = binding_command.replace(/([(\[{\\^$|)?*+.])/g, "\\$1"); // "[[" -> "\\[\\["
      // insertMode match?
      if ( !! insertMode != binding_mode) continue;

      var regexp = new RegExp('^(\\d*)(' + escaped_command + ')$');
      if (regexp.test(keys)) {
        removeStatusLine()
        var someFunctionCalled = true;
        keys.replace(regexp, '');
        // map j 3j
        var map_times = Number(RegExp.$1);
        if (map_times > 0) {
          times = map_times * (times || 1);
        }
        try {
          binding_function.call(e);
        } catch (err) {
          logError(err)
        }
        if (map_times > 0) {
          times = last_times;
        }
      }

      regexp = new RegExp('^(' + keys.replace(/([(\[{\\^$|)?*+.])/g, "\\$1") + ')');
      if (regexp.test(binding_command)) {
        var someBindingMatched = true;
      }
    }
    // TODO Refact me
    if ((someBindingMatched == undefined) && !keys.match(/^\d$/)) {
      var configure = Settings.get('background.configure');
      var mode = insertMode ? 'imap' : 'map';
      if (configure[mode]) {
        for (i in configure[mode]) {
          regexp = new RegExp('^(' + keys.replace(/([(\[{\\^$|)?*+.])/g, "\\$1") + ')');
          if (regexp.test(i)) {
            someBindingMatched = true;
          }
        }
      }
    }

    // hide status line if no binding matched && no function called
    if (!someBindingMatched && !someFunctionCalled) {
      removeStatusLine()
    }

    // If any function invoked, then store it to last run command.
    // (Don't do this when run repeat last command or In InsertMode)
    if (someFunctionCalled && e && key != '.' && !insertMode) {
      storeLast(keys, times);
    }

    // Reset currentKeys if nothing match or some function called
    if (!someBindingMatched || someFunctionCalled) currentKeys = "";

    // Set the count time.
    if (!someFunctionCalled && !insertMode && /^\d$/.test(key)) {
      times = (times || 0) * 10 + Number(key);
    }

    // If some function invoked and a key pressed, reset the count
    // but don't reset it if no key pressed, this should means the function is invoked by runLastCommand.
    if (someFunctionCalled && key) times = 0;

    // if Vrome is enabled and any functions executed.
    if (e && someFunctionCalled && !disableVrome && !pass_next_key) {
      // skip press Enter in insertMode (used to submit form)
      // or when focus is on a link
      if (!(isAcceptKey(key) && (insertMode || document.activeElement.nodeName == 'A'))) {
        stopPropagation(e)
      }
    }

    // Compatible with google's new interface
    if (key && key.match(/^.$/) && !insertMode && !(/^\d$/.test(key) && Option.get('allow_numeric'))) {
      stopPropagation(e)
    }
  }
