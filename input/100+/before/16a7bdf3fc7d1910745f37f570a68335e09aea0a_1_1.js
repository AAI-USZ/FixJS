function(node) {
  builder.dialogs.exportscript.node = node;
  builder.dialogs.exportscript.dialog = newNode('div', {class: 'dialog'});
  jQuery(node).append(builder.dialogs.exportscript.dialog);
  
  var format_list = newNode('ul');
  
  var cancel_b = newNode('a', 'Cancel', {
    class: 'button',
    click: function () {
      builder.dialogs.exportscript.hide();
    },
    href: '#cancel'
  });
  
  jQuery(builder.dialogs.exportscript.dialog).
      append(newNode('h3', 'Choose export format')).
      append(format_list).
      append(newNode('p', cancel_b));
  
  // Option to overwrite the already-saved file.
  if (builder.getScript().path &&
      builder.getScript().path.where == "local")
  {
    jQuery(format_list).append(create_overwrite_li());
  }
  
  if (builder.getScript().seleniumVersion == builder.selenium2) {
    for (var i = 0; i < builder.selenium2.io.formats.length; i++) {
      jQuery(format_list).append(create_sel2_format_li(builder.selenium2.io.formats[i]));
    }
  } else {
    if (builder.versionconverter.canConvert(builder.getScript(), builder.selenium2)) {
      jQuery(format_list).append(newNode("span", "Selenium 2:"));
      for (var i = 0; i < builder.selenium2.io.formats.length; i++) {
        jQuery(format_list).append(create_sel2_format_li(builder.selenium2.io.formats[i]));
      }
      jQuery(format_list).append(newNode("span", "Selenium 1:"));
    } else {
      var iList = builder.versionconverter.nonConvertibleStepNames(builder.getScript(), builder.selenium2);
      var inconvertibles = "";
      for (var i = 0; i < iList.length; i++) {
        inconvertibles += iList[i] + " ";
      }
      jQuery(format_list).append(newNode("span", "This script contains steps that can't be saved as Selenium 2 yet:", newNode("br"), inconvertibles));
    }
    var formats = builder.selenium1.adapter.availableFormats();
    for (var i = 0; i < formats.length; i++) {
      jQuery(format_list).append(create_sel1_format_li(formats[i]));
    }
  }
}