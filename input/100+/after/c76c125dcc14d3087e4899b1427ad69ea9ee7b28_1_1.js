function(event) {
        let [dropX, dropY] = event.get_coords();
        let target = this._dragActor.get_stage().get_actor_at_pos(Clutter.PickMode.ALL,
                                                                  dropX, dropY);
        // We call observers only once per motion with the innermost
        // target actor. If necessary, the observer can walk the
        // parent itself.
        let dropEvent = {
            dropActor: this._dragActor,
            targetActor: target,
            clutterEvent: event
        };
        for (let i = 0; i < dragMonitors.length; i++) {
            let dropFunc = dragMonitors[i].dragDrop;
            if (dropFunc)
                switch (dropFunc(dropEvent)) {
                    case DragDropResult.FAILURE:
                    case DragDropResult.SUCCESS:
                        return true;
                    case DragDropResult.CONTINUE:
                        continue;
                }
        }
        
        let cinnWindows = new Array();
        while (target) {
            cinnWindows.push(target);
            if (target._delegate && target._delegate.acceptDrop) {
                let [r, targX, targY] = target.transform_stage_point(dropX, dropY);
                if (target._delegate.acceptDrop(this.actor._delegate,
                                                this._dragActor,
                                                targX,
                                                targY,
                                                event.get_time())) {
                    if (this._actorDestroyed)
                        return true;
                    // If it accepted the drop without taking the actor,
                    // handle it ourselves.
                    if (this._dragActor.get_parent() == Main.uiGroup) {
                        if (this._restoreOnSuccess) {
                            this._restoreDragActor(event.get_time());
                            return true;
                        } else
                            this._dragActor.destroy();
                    }

                    this._dragInProgress = false;
                    global.unset_cursor();
                    this.emit('drag-end', event.get_time(), true);
                    this._dragComplete();
                    return true;
                }
            }
            target = target.get_parent();
        }
        
        // No Cinnamon actors have accepted drag-and-drop. Usually we'd
        // revert the drag here, but let's try identifying user intent
        // based on the Cinnamon actors and windows at our cursor's 
        // location. If we find a Nautilus window, we may use DBus to
        // interact with it and copy over the item if that's what we
        // determine user intent to be.
        
        // Define a single post-drag function we can call no matter how
        // we end up completing the action.
        let fnCompleted = function(self, event) {
            self._dragActor.destroy();
            self._dragInProgress = false;
            global.unset_cursor();
            self.emit('drag-end', event.get_time(), true);
            self._dragComplete();
            
            // @todo Close all popup menus
            global.display.emit('overlay-key');
            return true;
        };
        
        cinnWindows.pop();
        
        // If we have no target it's because we're trying to drop on an
        // actor that does not accept DnD.
        if (target === null && this.actor['_app'])
        {
            let onlyNautilus = true;
            // Get a list of windows which we could be dropping it on
            let windows = global.get_window_actors();
            let [stageWidth, stageHeight] = event.get_source().get_stage().get_size();
            
            // Filter out all Cinnamon actors that aren't at our mouse
            // coordinates. A resulting empty array suggests the user
            // is trying to drag to a non-Cinnamon window.
            cinnWindows = cinnWindows.filter(function(cw) {
                let [_w, _h] = cw.get_size();
                let [_x, _y] = cw.get_position();
                // For a cinnamon window to be considered, it must be
                // visible, must not be the exact size of our stage,
                // and must overlap our drop coordinates.
                return (cw.visible && _h>0 && _w>0 
                  && (_h!=stageHeight && _w!=stageWidth) 
                  && _x <= dropX && _x+_w >= dropX && _y <= dropY && _y+_h >= dropY);
            });
            
            // User released on a Cinnamon element, so we won't respond.
            if (cinnWindows.length > 0) {
                this._cancelDrag(event.get_time());
                return true;
            }
            
            // Now we need to filter out windows that are either not
            // visible or do not overlap our drop coordinates.
            windows = windows.filter(function(w) {
               let [_w, _h] = w.get_size();
               let [_x, _y] = w.get_position();
               
               return (w.visible && _x <= dropX && _x+_w >= dropX && _y <= dropY && _y+_h >= dropY);
            });

            // Not really a filter, just check whether we are only
            // dealing with Nautilus windows at the drop target.
            // If we have multiple windows stacked beneath the cursor,
            // we can't safely assume the user's intent (at least not
            // with some sort of visual feedback).
            windows = windows.filter(function(w) {
                if (!w['get_meta_window'] || w.get_meta_window().get_wm_class() != 'Nautilus') 
                  onlyNautilus = false;
                return true;
            });
            
            // Debug
            /*let titles = windows.map(function(w) {
                if (w['get_meta_window'])
                    return '[' + w.get_meta_window().get_layer() + '] ' 
                        + w.meta_window.get_wm_class() + ' - '
                        + w.meta_window.get_title();
                else
                    return 'Unknown Cinnamon container';
            });*/
            
            // Sort windows by layer
            windows.sort(function(a, b) {
                return a['get_meta_window'] && b['get_meta_window'] 
                  && a.get_meta_window().get_layer() <= b.get_meta_window().get_layer();
            });
            
            // Maybe accept this as an intent to drag and drop to file manager:
            // One file manager window at drop location OK (desktop)
            // Two file manager windows at drop location OK (desktop + one open folder)
            // More than two file managers NOT OK (they could be overlapping)
            // More than one unique application NOT OK (same)
            if (windows.length > 0 && windows[0].meta_window.get_wm_class() == 'Nautilus'
                && (windows.length == 1 || windows.length == 2 && onlyNautilus))
            {
                let filename, sourceFile, destFile;
                filename = this.actor._app.get_id();
                sourceFile = Gio.file_new_for_path(this.actor._app.get_tree_entry().get_desktop_file_path());
                
                try {
                    // Get the X window ID. This relies on Muffin's continued 
                    // exposing of window ID in the window description.
                    let xWindowId = windows[0].meta_window.get_description().split(' ')[0];
                    
                    // Connect to file manager handling the target window, if possible
                    //let fileMan = new FileManagerDBus.FileManager(xWindowId);
                    let fileMan = FileManagerDBus.GetForWindow(xWindowId);
                    let self = this;
                    fileMan.getCwd(function(path) {
                        if (path) {
                            destFile = Gio.file_new_for_path(path+"/"+filename);
                            FileManagerDBus.Copy(sourceFile, destFile);
                            FileManagerDBus.MakeExecutable(path+"/"+filename);
                            return fnCompleted(self, event);
                        }
                        else {
                            self._cancelDrag(event.get_time());
                        }
                    });
                    
                    return true;
                    
                } catch (e) {
                    if (windows[0].meta_window.get_title() == _('Desktop')) {
                        destFile = Gio.file_new_for_path(USER_DESKTOP_PATH+"/"+filename);
                        FileManagerDBus.Copy(sourceFile, destFile);
                        FileManagerDBus.MakeExecutable(USER_DESKTOP_PATH+"/"+filename);
                        return fnCompleted(this, event);
                    }
                }
            }
         }

        this._cancelDrag(event.get_time());

        return true;
    }