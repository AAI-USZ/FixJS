function(newOptions)
    {
      function getOption(key, defaultValue)
      {
        var value = String(newOptions[key]);
        if (value == "true") return true;
        if (value == "false") return false;
        return defaultValue;
      }

      self.ace.setProperty("showsauthorcolors", settings.noColors);

      self.ace.setProperty("rtlIsTrue", settings.rtlIsTrue);

      var v;

      v = getOption('showLineNumbers', true);
      self.ace.setProperty("showslinenumbers", v);
      padutils.setCheckbox($("#options-linenoscheck"), v);

      v = getOption('showAuthorColors', true);
      self.ace.setProperty("showsauthorcolors", v);
      padutils.setCheckbox($("#options-colorscheck"), v);

      v = getOption('useMonospaceFont', false);
      self.ace.setProperty("textface", (v ? "monospace" : "Arial, sans-serif"));
      $("#viewfontmenu").val(v ? "monospace" : "normal");
    }