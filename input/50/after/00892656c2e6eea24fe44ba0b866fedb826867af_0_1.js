function() {
  // NOTE(user): This check is not reliable in IE, where a document in an
  // iframe does not get unloaded when removing the iframe element from the DOM.
  // TODO(user): Find something that works in IE as well.
  // NOTE(user): "!this.peerWindowObject_.closed" evaluates to 'false' in IE9
  // sometimes even though typeof(this.peerWindowObject_.closed) is boolean and
  // this.peerWindowObject_.closed evaluates to 'false'. Casting it to a Boolean
  // results in sane evaluation. When this happens, it's in the inner iframe
  // when querying its parent's 'closed' status. Note that this is a different
  // case than mibuerge@'s note above.
  try {
    return !!this.peerWindowObject_ && !Boolean(this.peerWindowObject_.closed);
  } catch (e) {
    // If the window is closing, an error may be thrown.
    return false;
  }
}