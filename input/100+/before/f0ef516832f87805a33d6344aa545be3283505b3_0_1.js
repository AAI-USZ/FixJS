function(widget) {
        // Add overlay
        var stage = widget.get_stage();
        this._overlay.add(stage);

        // Inspect from lower child up to top parent
        this._inspected_widget = widget;
        this._widget_tree = new Array();
        var it_widget = widget;
        while (it_widget != null) {
            var w_name = "" + it_widget;
            var button = new Mx.Button({ label: w_name });

            this._widget_tree[w_name] = it_widget;

            // This test could be replaced by a check on the interface
            if (it_widget.list_properties != null) {
                // MxWidget -> inspect css props
                button.connect('clicked',
                               Lang.bind(this, function(button) {
                                   var widget = this._widget_tree[button.get_label()];
                                   this._inspect_style(widget);
                               }));
            } else {
                // ClutterActor -> nothing yet...
                button.connect('clicked',
                               Lang.bind(this, function(button) {
                                   var widget = this._widget_tree[button.get_label()];
                                   this._clean_style();
                                   this._inspected_widget = widget;
                               }));
            }

            button.connect('enter-event',
                           Lang.bind(this, function(button) {
                               var widget = this._widget_tree[button.get_label()];
                               var pos = widget.get_transformed_position();
                               var size = widget.get_transformed_size();

                               this._overlay.set_geometry(pos[0], pos[1],
                                                          size[0], size[1]);
                           }));
            button.connect('leave-event',
                           Lang.bind(this, function(button) {
                               this._overlay.hide();
                           }));

            this._parent_box.insert_actor(button, 0);
            this._parent_box.child_set_y_fill(button, true);
            this._parent_box.child_set_expand(button, true);

            it_widget = it_widget.get_parent();
        }
    }