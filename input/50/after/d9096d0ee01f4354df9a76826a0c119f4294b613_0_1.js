function next() {
    if( !this._schedule ) {
      return undefined;
    }
    var taskId = this._schedule.shift();
    var task = this._tasks[taskId];
    this.remove( taskId );
    return task;
  }