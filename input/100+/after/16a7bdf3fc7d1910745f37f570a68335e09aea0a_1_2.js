function create_sel1_format_li(myFormat) {
  var li_node = newNode('li',
    newNode('a', myFormat.name, {
      click: function(event) {
        if (myFormat.name === "HTML") {
          builder.dialogs.exportscript.do_export_sel1(myFormat);
        } else {
          builder.dialogs.rc.show(builder.dialogs.exportscript.node, null, function(hostPort, browserString) {
              builder.dialogs.exportscript.do_export_sel1(myFormat, hostPort, browserString);
            }, "Save");
        }
      },
      href: '#export-' + myFormat.id
    })
  );
  return li_node;
}