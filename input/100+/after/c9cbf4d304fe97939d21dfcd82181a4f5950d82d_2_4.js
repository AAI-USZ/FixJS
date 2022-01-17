function(targetId, eventType, contextInfo) {
        // console.debug("XFProcessor._dispatchEventType(",targetId,") this: ", this, " eventType:",eventType, " contextInfo:",contextInfo);
        try {
            dwr.engine.setErrorHandler(this._handleExceptions);
            dwr.engine.setOrdered(true);
            if (contextInfo == undefined) {
                Flux.dispatchEventType(targetId, eventType, this.sessionKey, lang.hitch(this, this.applyChanges));
            } else {
                Flux.dispatchEventTypeWithContext(targetId, eventType, this.sessionKey, contextInfo, lang.hitch(this, this.applyChanges));
            }
        }
        catch(ex) {
            fluxProcessor._handleExceptions("Failure executing Flux.dispatchEventType", ex);
        }
    }