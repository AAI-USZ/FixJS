function(task, condition){
    if (app.data.current_tag) {
        if (!((task.list.id in app.data.state.tags)
            && (app.data.current_tag === app.data.state.tags[task.list.id]))) {
            return false;
        }
    }
    if (!condition) {
        return !app.util.isCloseTask(task);
    }
    if (condition.none) {
        return false;
    }
    if (condition.closed) {
        if (!app.util.isCloseTask(task)) {
            return false;
        }
    } else {
        if (app.util.isCloseTask(task)) {
            return false;
        }
    }
    if (condition.turn) {
        if (task.list.id !== condition.list_id) {
            return false;
        }
        if (task.pending) {
            return false;
        }
        if (task.status === 2) {
            if (Number(condition.turn) !== Number(task.requester)) {
                return false;
            }
        } else {
            if (task.due_epoch && task.due_epoch > (new Date()).getTime()) {
                return false;
            }
            if (task.assign.length) {
                if (!app.util.findAccount(condition.turn, task.assign)) {
                    return false;
                }
            } else {
                if (Number(condition.turn) !== Number(task.requester)) {
                    return false;
                }
            }
        }
        return true;
    }
    if (condition.todo) {
        if (task.list.id in app.data.state.mute) {
            return false;
        }
        if (task.pending) {
            return false;
        }
        if (task.status === 2) {
            return false;
        }
        if (task.assign.length) {
            if (!app.util.findMe(task.assign)) {
                return false;
            }
        } else {
            if (!app.util.findMe([task.requester])) {
                return false;
            }
        }
        if (task.due_epoch && task.due_epoch > (new Date()).getTime()) {
            return false;
        }
    }
    if (condition.verify) {
        if (!app.util.findMe([task.requester])) {
            return false;
        }
        if (!app.util.findOthers(task.assign)) {
            return false;
        }
        if (task.status !== 2) {
            return false;
        }
    }
    if (condition.request) {
        if (!app.util.findMe([task.requester])) {
            return false;
        }
        if (!app.util.findOthers(task.assign)) {
            return false;
        }
        if (task.status === 2) {
            return false;
        }
    }
    if (condition.star) {
        if (!(task.id in app.data.state.star)) {
            return false;
        }
    }
    return true;
}