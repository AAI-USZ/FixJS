function(){
  return {
      id: this.id
    , type: this.type
    , data: this.data
    , priority: this._priority
    , progress: this._progress || 0
    , state: this._state
    , error: this._error
    , created_at: this.created_at
    , updated_at: this.updated_at
    , failed_at: this.failed_at
    , duration: this.duration
    , delay: this._delay
    , heartbeat: this._heartbeat
    , attempts: {
        made: this._attempts
      , remaining: this._max_attempts - this._attempts
      , max: this._max_attempts
    }
  	, restarts: {
      made: this._restarts
      , remaining: this._max_restarts - this._restarts
      , max: this._max_restarts
  }
  };
}