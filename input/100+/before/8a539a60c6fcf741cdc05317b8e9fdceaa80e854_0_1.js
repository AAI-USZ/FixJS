function (start_task, on_done, task) {
        var my_gate = this;
        if (_.isString(start_task) && (!task)){
            task == start_task;
        }
        return function () {
            if (on_done){
                on_done();
            }
            my_gate.task_done( task);
        }
        if (start_task) {
            // acknowledge that a task has been begun.
            this.task_start(task);
        }
    }