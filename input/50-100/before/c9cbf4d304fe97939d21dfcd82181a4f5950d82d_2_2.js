function() {
        console.debug("XFProcessor._fifoProcessingFinished");
        domClass.remove(this.indicatorTargetObject, "bfPending");
        // Don't iterate through all items ... only use the last one and skip the rest
        var currentItem = this.lastServerClientFocusEvent;
        if (currentItem != undefined) {
            if (currentItem != null) {
                currentItem.postponedFunction(currentItem.postponedXmlEvent);
                this.lastServerClientFocusEvent = null;
            }
        }


        fluxProcessor.indicatorImage.className = 'xfDisabled';
    }