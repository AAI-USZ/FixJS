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

        while (target) {
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

        this._cancelDrag(event.get_time());

        return true;
    }