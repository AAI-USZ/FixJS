function() {
  var pollfds     = this.initializeDescriptors();
  var changeCount = 0;

  while (NSPR.lib.PR_Poll(pollfds, pollfds.length, -1) != -1) {

      if (this.isWakeupEvent(pollfds[this.connections.length].out_flags)) {
	dump("Bailing out for wakeup...\n");
	return;
      }

      if (this.isAcceptEvent(pollfds[this.connections.length + 1].out_flags)) {
	dump("Handling accept event...\n");
	this.handleAcceptEvent();	
      }

      var i;

      for (i=0;i<this.connections.length;i+=2) {
	if (this.isSocketClosed(pollfds[i].out_flags) ||
	    this.isSocketClosed(pollfds[i+1].out_flags)) 
	{
	  dump("Detected socket closed...\n");
	  pollfds = this.removeSocketPair(i, i+1);
	  continue;
	}

	if (!this.shuffleIfReady(pollfds[i].out_flags, i, i+1)) {
	  pollfds = this.removeSocketPair(i, i+1);
	  continue;
	}

	if (!this.shuffleIfReady(pollfds[i+1].out_flags, i+1, i)) {
	  pollfds = this.removeSocketPair(i, i+1);
	  continue;
	}
      }
    }
    
}