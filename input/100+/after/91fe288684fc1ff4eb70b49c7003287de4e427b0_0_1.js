function() {
        /* "this.myactor.destroy_children()" produces mysterious warnings:
        "Clutter-CRITICAL **: clutter_actor_unmap: assertion `CLUTTER_IS_ACTOR (self)' failed",
        one for each child actor, so let's use a loop instead. */

        for ( let i = 0; i < this._windows.length; ++i ) {
            this.myactor.remove_actor(this._windows[i].actor);
            this._windows[i].actor.destroy();
        }
        this._windows = new Array();

        let metaWorkspace = global.screen.get_active_workspace();
        let windows = metaWorkspace.list_windows();
        windows.sort(Lang.bind(this, function(w1, w2) {
            if (this._windows_order){
                let order = this._windows_order[metaWorkspace];
                if (order){
                    let iw1 = order.indexOf(w1);
                    let iw2 = order.indexOf(w2);
                    if (iw1==-1) return 1;
                    else if (iw2==-1) return -1;
                    else return iw1 - iw2;
                }else return w1.get_stable_sequence() - w2.get_stable_sequence;
            }else return w1.get_stable_sequence() - w2.get_stable_sequence;
        }));
                
        // Create list items for each window
        let tracker = Cinnamon.WindowTracker.get_default();
        for ( let i = 0; i < windows.length; ++i ) {
            let metaWindow = windows[i];
            if ( metaWindow && tracker.is_window_interesting(metaWindow) ) {
                let app = tracker.get_window_app(metaWindow);
                if ( app ) {
                    let appbutton = new AppMenuButton(this, metaWindow, false, this.orientation);
                    this._windows.push(appbutton);
                    this.myactor.add(appbutton.actor);
                }
            }
        }

        this._onFocus();
    }