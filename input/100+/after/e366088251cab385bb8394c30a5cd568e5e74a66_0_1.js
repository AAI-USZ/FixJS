function() {
    let model = new Gtk.ListStore();

    model.set_column_types([
      GObject.TYPE_STRING,
      GObject.TYPE_STRING,
      GObject.TYPE_INT,
      GObject.TYPE_INT
    ]);

    let bindings = {
        "put-to-corner-ne": "Move to top right corner",
        "put-to-corner-nw": "Move to top left corner",
        "put-to-corner-se": "Move to bottom right corner",
        "put-to-corner-sw": "Move to bottom left corner",
        "put-to-side-n": "Move to top",
        "put-to-side-e": "Move right",
        "put-to-side-s": "Move to bottom",
        "put-to-side-w": "Move to left",
        "put-to-center": "Move to center/maximize",
        "put-to-location": "Move to configured location"
    };

    for (name in bindings) {
      let [key, mods] = Gtk.accelerator_parse(Utils.get_strv(name, null)[0]);
      let row = model.insert(10);
      model.set(row, [0, 1, 2, 3], [name, bindings[name], mods, key ]);

    }

    let treeview = new Gtk.TreeView({
      'expand': true,
      'model': model
    });


    // Action column
    let cellrend = new Gtk.CellRendererText();
    let col = new Gtk.TreeViewColumn({ 'title': 'Action', 'expand': true });
    col.pack_start(cellrend, true);
    col.add_attribute(cellrend, 'text', 1);
    treeview.append_column(col);

    // keybinding column
    cellrend = new Gtk.CellRendererAccel({
      'editable': true,
      'accel-mode': Gtk.CellRendererAccelMode.GTK
    });

    cellrend.connect('accel-edited', function(rend, iter, key, mods) {
      let value = Gtk.accelerator_name(key, mods);
      let [succ, iterator ] = model.get_iter_from_string(iter);

      if(!succ) {
        throw new Error("Error updating Keybinding");
      }

      let name = model.get_value(iterator, 0);

      model.set(iterator, [ 2, 3], [ mods, key ]);
      Utils.set_strv(name, [value]);
    });

    col = new Gtk.TreeViewColumn({'title': 'Modify'});

    col.pack_end(cellrend, false);
    col.add_attribute(cellrend, 'accel-mods', 2);
    col.add_attribute(cellrend, 'accel-key', 3);

    treeview.append_column(col);

    return treeview;
  }