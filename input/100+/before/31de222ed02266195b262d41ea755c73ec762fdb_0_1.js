function Frisby(msg) {
  // Setup
  this._setup = globalSetup();

  // Optional exception handler
  this._exceptionHandler = false;

  // Spec storage
  this.current = {
    outgoing: {},
    describe: msg,
    itInfo: null,
    it: null,
    expects: [],
    after: [],

    // Response storage
    response: {
      error: null,
      status: null,
      headers: [],
      body: null,
      time: 0
    }
  };
  this.currentRequestFinished = false;

  // Default timeout
  this._timeout = 5000;

  // Response type
  this.responseType = 'json';

  return this;
}