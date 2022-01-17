function(flags, fromIndex, toIndex) {
  if ((flags & NSPR.lib.PR_POLL_READ) > 0) {
    var read = NSPR.lib.PR_Read(this.connections[fromIndex], this.buffer, 4096);
    
    if (read == -1) {
      if (NSPR.lib.PR_GetError() == NSPR.lib.PR_WOULD_BLOCK_ERROR) {
	return true;
      } else {
	dump("Read error: " + NSPR.lib.PR_GetError() + "\n");
	return false;
      }
    } else if (read == 0) {
      return false;
    }
    
    NSPR.lib.PR_Write(this.connections[toIndex], this.buffer, read);
  }
  
  return true;
}