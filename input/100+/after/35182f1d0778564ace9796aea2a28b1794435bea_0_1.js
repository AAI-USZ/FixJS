function(f, arguments){

  return function(){

    // Skip this validator if error

    this.err = this.err || f.apply(this, arguments);

    // Call error handler if error

    if(this.errorCallback && this.err) this.errorCallback(this.err);

    return this;

  }

}