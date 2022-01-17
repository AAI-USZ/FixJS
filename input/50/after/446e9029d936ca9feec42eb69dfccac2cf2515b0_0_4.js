function (optionName, index) {
        // Strip whitespace
        optionName = optionName.trim();

        // Use first argument as params object...
        config[optionName] = (args[0] && args[0][optionName])
          || args[index]; // or grab the formal parameter.
      }