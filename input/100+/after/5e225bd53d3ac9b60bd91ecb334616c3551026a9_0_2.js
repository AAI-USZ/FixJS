function(flags, fromIndex, toIndex) {
  if ((flags & NSPR.lib.PR_POLL_READ) > 0) {
    // dump("Shuffling from: "  + fromIndex + " to " + toIndex + "\n");
    var read = NSPR.lib.PR_Read(this.connections[fromIndex], this.buffer, 4095);
    
    if (read == -1) {
      if (NSPR.lib.PR_GetError() == NSPR.lib.PR_WOULD_BLOCK_ERROR) {
	return true;
      } else {
	dump("Read error: " + NSPR.lib.PR_GetError() + "\n");
	return false;
      }
    } else if (read == 0) {
      dump("ShuffleWorker: EOF!!!!\n");
      return false;
    }

    this.buffer[read] = 0x00;
    // dump("ShuffleWorker: " + this.buffer.readString() + "\n");
    
    NSPR.lib.PR_Write(this.connections[toIndex], this.buffer, read);
  }
  
  return true;
}