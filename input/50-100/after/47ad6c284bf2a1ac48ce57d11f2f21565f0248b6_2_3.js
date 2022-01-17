function() {
  var loc = '';
  if (!common.isBlankOrUndef(this.fields.address)) {
    // Do we have a well-formatted address?
    loc += encodeURIComponent(this.fields.address);

    // Do we have a descriptive location in addition to an address?
    if (!common.isBlankOrUndef(this.fields.location)) {
      loc += encodeURIComponent(' (' + this.fields.location + ')');
    }

  } else if (!common.isBlankOrUndef(this.fields.location)) {
    // We only have a descriptive location; no address.
    loc = encodeURIComponent(this.fields.location);
  }

  return loc;
}