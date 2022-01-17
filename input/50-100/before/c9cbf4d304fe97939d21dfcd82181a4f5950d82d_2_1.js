function (targetId) {
        console.debug("XFProcessor.dispatch(",targetId,") this: ", this);
        try {
            dwr.engine.setErrorHandler(this._handleExceptions);
            dwr.engine.setOrdered(true);
            Flux.dispatchEvent(targetId, this.sessionKey, this.applyChanges);
        } catch(ex) {
            fluxProcessor._handleExceptions("Failure executing Flux.dispatchEvent", ex);
        }
        // TODO: TBR: Lars really needed?
        // return false;
    }