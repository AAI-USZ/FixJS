function() {
        this._list.destroy_all_children();

        for (let i = 0; i < global.screen.n_workspaces; i++) {
            let indicator = null;

           if (i == this._activeWorkspaceIndex && this._direction == Meta.MotionDirection.UP)
               indicator = new St.Bin({ style_class: 'ws-switcher-active-up' });
           else if(i == this._activeWorkspaceIndex && this._direction == Meta.MotionDirection.DOWN)
               indicator = new St.Bin({ style_class: 'ws-switcher-active-down' });
           else
               indicator = new St.Bin({ style_class: 'ws-switcher-box' });

           this._list.add_actor(indicator);

        }

        let primary = Main.layoutManager.primaryMonitor;
        let [containerMinHeight, containerNatHeight] = this._container.get_preferred_height(global.screen_width);
        let [containerMinWidth, containerNatWidth] = this._container.get_preferred_width(containerNatHeight);
        this._container.x = primary.x + Math.floor((primary.width - containerNatWidth) / 2);
        this._container.y = primary.y + Main.panel.actor.height +
                            Math.floor(((primary.height - Main.panel.actor.height) - containerNatHeight) / 2);
    }