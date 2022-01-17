function (targetId) {
        // console.debug("XFProcessor.dispatch(",targetId,") this.xfProcessor: ", this);
        try {
            dwr.engine.setErrorHandler(this._handleExceptions);
            dwr.engine.setOrdered(true);
            Flux.dispatchEvent(targetId, this.sessionKey, this.applyChanges);
        } catch(ex) {
            fluxProcessor._handleExceptions("Failure executing Flux.dispatchEvent", ex);
        }
    }