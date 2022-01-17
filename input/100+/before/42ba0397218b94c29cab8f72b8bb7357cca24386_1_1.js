function(blob, start, opt_end) {
  if (!goog.isDef(opt_end)) {
    opt_end = blob.size;
  }
  if (blob.webkitSlice) {
    // Natively accepts negative indices, clamping to the blob range and
    // range end is optional. See http://trac.webkit.org/changeset/83873
    return blob.webkitSlice(start, opt_end);
  } else if (blob.mozSlice) {
    // Natively accepts negative indices, clamping to the blob range and
    // range end is optional. See https://developer.mozilla.org/en/DOM/Blob
    // and http://hg.mozilla.org/mozilla-central/rev/dae833f4d934
    return blob.mozSlice(start, opt_end);
  } else if (blob.slice) {
    // This is the original specification. Negative indices are not accepted,
    // only range end is clamped and range end specification is obligatory.
    // See http://www.w3.org/TR/2009/WD-FileAPI-20091117/, this will be
    // replaced by http://dev.w3.org/2006/webapi/FileAPI/ in the future.
    if (start < 0) {
      start += blob.size;
    }
    if (start < 0) {
      start = 0;
    }
    if (opt_end < 0) {
      opt_end += blob.size;
    }
    if (opt_end < start) {
      opt_end = start;
    }
    return blob.slice(start, opt_end - start);
  }
  return null;
}