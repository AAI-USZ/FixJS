function() {
        if (!this.visible || this.animationInProgress)
            return;

        this.animationInProgress = true;
        this._hideInProgress = true;
        let maximizedWindow = false;
        let windows = global.screen.get_active_workspace().list_windows();
        for (let i = 0; i < windows.length; i++) {
            let metaWindow = windows[i];
            if (metaWindow.showing_on_its_workspace() &&
                metaWindow.maximized_horizontally &&
                metaWindow.maximized_vertically)
                maximizedWindow = true;
        }

        if (Main.panel){
            Main.panel.actor.show();
            Tweener.addTween(Main.panel.actor, {opacity: 255, time: ANIMATION_TIME, transition: 'easeOutQuad'});
        }
        if (Main.panel2){
            Main.panel2.actor.show();
            Tweener.addTween(Main.panel2.actor, {opacity: 255, time: ANIMATION_TIME, transition: 'easeOutQuad'});
        }

        Tweener.addTween(this._background,
                         { dim_factor: 1,
                           time: ANIMATION_TIME,
                           transition: 'linear',
                           onComplete: this._hideDone,
                           onCompleteScope: this
                         });

        this.activeWorkspace = this._expo._thumbnailsBox._lastActiveWorkspace;
        let activeWorkspaceActor = this.activeWorkspace.actor;
        //this.activeWorkspace._fadeInUninterestingWindows();
        this.activeWorkspace._overviewModeOff();
        this._createClone(activeWorkspaceActor);
        this.clone.set_position(activeWorkspaceActor.allocation.x1, activeWorkspaceActor.allocation.y1);
        this.clone.set_scale(activeWorkspaceActor.get_scale()[0], activeWorkspaceActor.get_scale()[1]);
        this.clone.show();
        let y = 0;
        if (global.settings.get_string("desktop-layout") != 'traditional' && !global.settings.get_boolean("panel-autohide"))
            y = Main.panel.actor.height; 
        Tweener.addTween(this.clone, {  x: 0, 
                                        y: y, 
                                        scale_x: 1 , 
                                        scale_y: 1, 
                                        time: ANIMATION_TIME, 
                                        transition: 'easeOutQuad', 
                                        onComplete: this.hide});

        this._coverPane.raise_top();
        this._coverPane.show();
        this.emit('hiding');
    }