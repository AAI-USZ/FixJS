function() {
  // TODO: Indicate failure reason in response.  The spec doesn't seem to define
  //       this, but perhaps there is a convention.
  return 'OAuth realm="' + this._realm + '"';
}