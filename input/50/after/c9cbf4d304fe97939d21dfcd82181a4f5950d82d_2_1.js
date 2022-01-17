function(evt) {
        // console.debug("XFProcessor.handleUnload Event: ", evt);
        if (this.isDirty && !this.skipshutdown) {
            event.stopEvent(evt);
            // console.debug(this.unloadMsg);
            // For IE
            evt.returnValue = this.unloadMsg;
            // For all others
            return this.unloadMsg;
        }
    }