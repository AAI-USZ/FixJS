function(appsMenuButton, app) {
        GenericApplicationButton.prototype._init.call(this, appsMenuButton, app, true);

        this.actor.add_style_class_name('menu-application-button');
        this.icon = this.app.create_icon_texture(APPLICATION_ICON_SIZE);
        this.addActor(this.icon);
        this.label = new St.Label({ text: this.app.get_name(), style_class: 'menu-application-button-label' });
        this.addActor(this.label);
        this.actor._app = app; // backreference
        this._draggable = DND.makeDraggable(this.actor);
        this.isDraggableApp = true;
    }