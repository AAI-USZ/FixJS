function(dojoObject) {
        console.debug("XFProcessor._useLoadingMessage dojoObject:" + dojoObject);
        if (fluxProcessor.indicatorObjectTimer) {
            clearTimeout(fluxProcessor.indicatorObjectTimer);
        }
        if (this.indicatorTargetObject) {
            domClass.remove(this.indicatorTargetObject, "bfPending");
        }

        this.indicatorTargetObject = dojoObject;

        domClass.add(dojoObject, "bfPending");

        try {
            dwr.engine.setPreHook(function() {
                fluxProcessor.indicatorImage.className = 'xfEnabled';
                return false;
            });
            dwr.engine.setPostHook(function() {
                fluxProcessor.indicatorObjectTimer = setTimeout('fluxProcessor._fifoProcessingFinished()', 500);
                return false;
            });
        }
        catch(ex) {
            fluxProcessor._handleExceptions("Failure executing Flux._useLoadingMessage", ex);
        }
    }