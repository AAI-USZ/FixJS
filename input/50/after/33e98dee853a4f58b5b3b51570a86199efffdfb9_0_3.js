function(msgs) {
  /* msgs is a dict: (key : messagetype, value : messages) */
  for (var mtype in msgs) {
    if (mtype in mmap.messageHandlerMap){
      mmap.handleMessage(msgs[mtype]);
    }
  }
    mmap.adi.draw();
}