function(app) {
        let display = new AppDisplay.AppWellIcon(app,
                                                 { setSizeManually: true,
                                                   showLabel: false });
        display._draggable.connect('drag-begin',
                                   Lang.bind(this, function() {
                                       display.actor.opacity = 50;
                                   }));
        display._draggable.connect('drag-end',
                                   Lang.bind(this, function() {
                                       display.actor.opacity = 255;
                                   }));

        let item = new DashItemContainer();
        item.setChild(display.actor);

        item.setLabelText(app.get_name());
        // Override default AppWellIcon label_actor
        display.actor.label_actor = item.label;


        display.icon.setIconSize(this.iconSize);
        display.actor.connect('notify::hover',
                               Lang.bind(this, function() {
                                   this._onHover(item, display)
                               }));

        Main.overview.connect('hiding',
                              Lang.bind(this, function() {
                                  this._labelShowing = false;
                                  item.hideLabel();
                              }));

        return item;
    }