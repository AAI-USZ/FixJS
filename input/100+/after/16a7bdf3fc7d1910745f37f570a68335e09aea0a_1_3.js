function create_sel2_format_li(myFormat) {
  var script = builder.getScript();
  if (script.seleniumVersion === builder.selenium1) {
    script = builder.versionconverter.convertScript(script, builder.selenium2);
  }
  var nonExportables = myFormat.nonExportables(script);
  if (nonExportables.length > 0) {
    var l = "";
    for (var i = 0; i < nonExportables.length; i++) {
      if (i !== 0) { l += ", "; }
      l += nonExportables[i];
    }
    return newNode('li', "Cannot export as " + myFormat.name + ". The following steps are not supported: " + l + ".");
  }
  var li_node = newNode('li',
    newNode('a', myFormat.name, {
      click: function(event) {
        if (builder.selenium2.io.saveScript(script, myFormat)) {
          builder.getScript().path = script.path; // If the 
          builder.suite.setCurrentScriptSaveRequired(false);
          builder.gui.suite.update();
        }
        builder.dialogs.exportscript.hide();
      },
      href: '#export-sel2'
    })
  );
  return li_node;
}