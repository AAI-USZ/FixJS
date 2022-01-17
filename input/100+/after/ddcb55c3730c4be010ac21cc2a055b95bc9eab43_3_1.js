function (event) {
            fluid.log("Cancellation through " + event.type + " on " + fluid.dumpEl(event.target)); 
            that.lastCancel = Date.now();
            that.blurPending = false;
        }