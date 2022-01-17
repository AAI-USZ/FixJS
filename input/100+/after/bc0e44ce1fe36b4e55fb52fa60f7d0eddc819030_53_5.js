function kc_loadKeyboard(name) {
      var keyboard = Keyboards[name];
      if (keyboard.imEngine)
        this.loadIMEngine(name);

      if (_wordSuggestionEnabled && keyboard.suggestionEngine)
        this.loadSuggestionEngine(name);
    }