function(event) {
      if (builder.getScript().seleniumVersion === builder.selenium1) {
        if (builder.selenium2.io.formats.indexOf(path.format) !== -1) {
          script = builder.versionconverter.convertScript(script, builder.selenium2);
        } else {
          var file = builder.selenium1.adapter.exportScriptWithFormatToPath(
            script,
            path.format,
            path.path);
          if (file) {
            builder.suite.setCurrentScriptSaveRequired(false);
            builder.gui.suite.update();
          }
        }
      }
      if (script.seleniumVersion === builder.selenium2) {
        if (builder.selenium2.io.saveScript(script, path.format, path.path)) {
          builder.suite.setCurrentScriptSaveRequired(false);
          builder.gui.suite.update();
        }
      }
      builder.dialogs.exportscript.hide();
    }