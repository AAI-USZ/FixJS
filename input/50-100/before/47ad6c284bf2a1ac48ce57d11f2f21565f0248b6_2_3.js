function() {
  var loc = '';
  if (!isBlankOrUndef(this.fields.address)) {
    // Do we have a well-formatted address?
    loc += encodeURIComponent(this.fields.address);

    // Do we have a descriptive location in addition to an address?
    if (!isBlankOrUndef(this.fields.location)) {
      loc += encodeURIComponent(' (' + this.fields.location + ')');
    }

  } else if (!isBlankOrUndef(this.fields.location)) {
    // We only have a descriptive location; no address.
    loc = encodeURIComponent(this.fields.location);
  }

  return loc;
}