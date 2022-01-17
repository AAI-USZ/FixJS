function() {
  var descriptors       = this.initializeDescriptors();
  var pollfds           = descriptors.pollfds;
  var connectionsLength = descriptors.connectionsLength;

  while (NSPR.lib.PR_Poll(pollfds, pollfds.length, -1) != -1) {
    var modified = false;

    if (this.isWakeupEvent(pollfds[connectionsLength].out_flags)) {
      dump("Bailing out for wakeup...\n");
      return;
    }

    if (this.isAcceptEvent(pollfds[connectionsLength + 1].out_flags)) {
      dump("Handling accept event...\n");
      this.handleAcceptEvent();	
    }

    // dump("ConnectionsLength: " + connectionsLength + "\n");

    for (var i=connectionsLength-2;i>=0;i-=2) {
      // dump("Checking pair: " + i + " , " + (i+1) + "\n");
      if (this.isSocketClosed(pollfds[i].out_flags) ||
	  this.isSocketClosed(pollfds[i+1].out_flags)) 
      {
	dump("Detected socket closed...\n");
	this.removeSocketPair(i, i+1);
	modified = true;
      } else if (!this.shuffleIfReady(pollfds[i].out_flags, i, i+1)) {
	this.removeSocketPair(i, i+1);
	modified = true;
      } else if (!this.shuffleIfReady(pollfds[i+1].out_flags, i+1, i)) {
	this.removeSocketPair(i, i+1);
	modified = true;
      }
    }
    
    if (modified) {
      descriptors       = this.initializeDescriptors();
      pollfds           = descriptors.pollfds;
      connectionsLength = descriptors.connectionsLength;
    }
  }
}