function() {
        if (this.visible || this.animationInProgress)
            return;

        this.visible = true;
        this.animationInProgress = true;

        // All the the actors in the window group are completely obscured,
        // hiding the group holding them while the Overview is displayed greatly
        // increases performance of the Overview especially when there are many
        // windows visible.
        //
        // If we switched to displaying the actors in the Overview rather than
        // clones of them, this would obviously no longer be necessary.
        //
        // Disable unredirection while in the overview
        Meta.disable_unredirect_for_screen(global.screen);
        global.window_group.hide();
        this._group.show();
        this._background.show();
        this._addWorkspaceButton.show();
        this._expo.show();

        this.activeWorkspace = this._expo._thumbnailsBox._lastActiveWorkspace;
        let activeWorkspaceActor = this.activeWorkspace.actor;
        this._expo._thumbnailsBox._lastActiveWorkspace._fadeOutUninterestingWindows();

        this.allocateID = this.activeWorkspace.connect('allocated', Lang.bind(this, this._animateVisible2));

        this._createClone(activeWorkspaceActor);
        if (global.settings.get_string("desktop-layout") != 'traditional' && !global.settings.get_boolean("panel-autohide"))
            this.clone.set_position(0, Main.panel.actor.height); 

        this.clone.show();

        this._gradient.show();
        
        if (Main.panel)
            Tweener.addTween(Main.panel.actor, {    opacity: 0, 
                                                    time: ANIMATION_TIME, 
                                                    transition: 'easeOutQuad', 
                                                    onComplete: function(){Main.panel.actor.hide();}});
        if (Main.panel2)
            Tweener.addTween(Main.panel2.actor, {   opacity: 0, 
                                                    time: ANIMATION_TIME, 
                                                    transition: 'easeOutQuad', 
                                                    onComplete: function(){Main.panel2.actor.hide();}});
        
        this._background.dim_factor = 1;
        Tweener.addTween(this._background,
                            { dim_factor: 0.4,
                              transition: 'easeOutQuad',
                              time: ANIMATION_TIME});

        /*Tweener.addTween(this,
                            { time: 0.4,
                              onComplete: this._animateVisible2,
                              onCompleteScope: this});*/

        this._coverPane.raise_top();
        this._coverPane.show();
        this.emit('showing');
    }