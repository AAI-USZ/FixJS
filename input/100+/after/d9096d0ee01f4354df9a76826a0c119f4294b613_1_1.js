function run() {
    var task = this;
    var result = task.result;
    task.result = undefined;
    task._scheduler.current = task;
    
    try{
      task._runState = R_RUNNING;
      if( task._taskState === T_CANCELLED ) {
        task._runState = R_RESOLVED;
        task._taskState = T_CLOSED;
        task._scheduler.remove( task.id );
      } else if( task._taskState === T_STARTED ) {
        // Run the task
        result = task._thunk.call( this._context, result );
        task._runState = R_BLOCKED;

        // Process the result
        if( result instanceof Complete ) {
          task.result = result.value;
          task._taskState = T_CLOSED;
          task._runState = R_RESOLVED;
          task._deferred.resolve( task.result );
        } else {
          task.result = when( result,
            // callback
            function( value ) {
              task.result = value;
              task._runState = R_RESOLVED;
              if( task._taskState === T_STARTED ) {
                task._scheduler.insert( task, task.id, task._schedule );
              }
            },
            // errback
            function( error ) {
              task.result = error;
              task._runState = R_REJECTED;
              if( task._taskState === T_STARTED ) {
                task._scheduler.insert( task, task.id, task._schedule );
              }
            }
          );
        }
      } else {
        throw Error( "task is not runnable" );
      }
    } catch( exception ) {
      task.result = exception;
      task._taskState = T_CLOSED;
      task._runState = R_REJECTED;
      task._deferred.reject( exception );
      console.log( "Task", task.id, ": ", exception.stack );
    }
    
    task._scheduler.current = null;
    return this;
  }