function init_drag(event) {
        // Called on mousedown or touchstart, we haven't started dragging yet
        // TODO: Don't start drag on a text input
        if (!blend(event)) {
            return undefined;
        }
        var eT = $(event.target);
        if (eT.is(':input') && ! eT.contained_by($('#accordion'))) {
            return undefined;
        }
        // console.log('init_drag');
        var target = eT.closest('.wrapper');
        if (target.length) {
            drag_target = target;
            start_position = target.offset();
            if (! target.parent().is('#scripts_workspace')) {
                start_parent = target.parent();
            }
        } else {
            //console.log('no target in init_drag');
            drag_target = null;
        }
        return false;
    }