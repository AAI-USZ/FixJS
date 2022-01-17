function next() {
    if( !this._schedule ) {
      return undefined;
    }
    var taskId = this._schedule.shift();
    return this._tasks[taskId];
  }