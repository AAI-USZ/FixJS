function (start_task, on_done, task) {
        var my_gate = this;
        if (_.isString(start_task) && (!task)){
            task = start_task;
        }
        if (start_task) {
            // acknowledge that a task has been begun.
            if (this.debug){
                console.log('starting task and returning callback %s', task);
            }
            this.task_start(task);
        } else {
            if (this.debug){
                console.log('NOT starting task - just returning callback %s', task);
            }
        }
        return function () {
            if (on_done){
                on_done();
            }
            my_gate.task_done( task);
        }
    }