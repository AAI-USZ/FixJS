function() {
        // console.debug("XFProcessor.eventFifoReader: this.clientServerEventQueue:",this.clientServerEventQueue);
        var nextPendingClientServerEvent = null;
        var dojoObject = null;
        var dijitObject = null;

        //Loop as long as Pending Events are being skipped (as long as no Request is being initiated)
        while ((!this.requestPending) && (this.clientServerEventQueue.length != 0)) {
            nextPendingClientServerEvent = this.clientServerEventQueue.shift();

            var callerFunction = nextPendingClientServerEvent.getCallerFunction();
            var nextPendingTargetId = nextPendingClientServerEvent.getTargetId();
            // TODO: Lars: not need anymore due to devtool!?!
/*
            switch (callerFunction) {
                case "dispatchEvent":       console.info("FIFO-READ:  dispatchEvent(" + nextPendingTargetId + ")"); break;
                case "dispatchEventType":   console.info("FIFO-READ:  dispatchEventType(" + nextPendingTargetId + ", " + nextPendingClientServerEvent.getEventType() + ", " + nextPendingClientServerEvent.getContextInfo() + ")"); break;
                case "setControlValue":     console.info("FIFO-READ:  setControlValue(" + nextPendingTargetId + ", " + nextPendingClientServerEvent.getValue() + ")"); break;
                case "setRepeatIndex":      console.info("FIFO-READ: setRepeatIndex(" + nextPendingTargetId + ", " + nextPendingClientServerEvent.getValue() + ")"); break;
                default:break;
            }
*/

            //*****************************************************************************
            // START: skip this pending Event, if one of the following conditions occurred:
            //*****************************************************************************

            dojoObject = dom.byId(nextPendingTargetId);
            // console.debug("EventFifoReader dojoObject:",dojoObject, " targetId: ",nextPendingTargetId);
            if (dojoObject == null) {
                console.warn("Event (Client to Server) for Dojo Control " + dojoObject + " skipped. CAUSE: OBJECT is NULL",nextPendingTargetId);
                continue;
            }

            if(callerFunction != "setRepeatIndex"){
                dijitObject = registry.byId(nextPendingTargetId);
            }

            // console.debug("EventFifoReader dijitObject:",dijitObject, " targetId: ",nextPendingTargetId);

            if (dijitObject == null && callerFunction != "setRepeatIndex") {
                console.warn("XFProcessor.eventFifoReader: Event (Client to Server) for Dijit Control " + dijitObject + " skipped. CAUSE: OBJECT is NULL");
                continue;

            }else if(callerFunction != "setRepeatIndex"){
                // Test if this dijit-control has an isReadonly() method
                console.debug("XFProcessor.eventFifoReader: check if Object is readonly:",dijitObject, " reaondly: ",dijitObject.isReadonly());

                if (dijitObject && dijitObject.isReadonly()) {
                    console.warn("XFProcessor.eventFifoReader: Event (Client to Server) for Dijit Control " + dijitObject + " skipped. CAUSE: READ-ONLY");
                    continue;
                }

            }


            // Test if the Control's event was a setControlValue
            if (callerFunction == "setControlValue") {
                // Test if the next Control-Value-Change originates from the same Control as this Control-Value-Change
                if (this.clientServerEventQueue[0] != null) {
                    // Test if the targetId of this event and the next one are equal
                    if (this.clientServerEventQueue[0].getTargetId() == nextPendingTargetId) {
                        // Test if the CallerFunction of the next Event is also setControlValue
                        if (this.clientServerEventQueue[0].getCallerFunction() == "setControlValue") {
                            console.debug("XFProcessor.eventFifoReader: Event (Client to Server) for Dijit Control " + dijitObject + " skipped. CAUSE: superseeded by following value-change of same Control");
                            continue;
                        }
                        else {
                            //console.debug("Nothing to skip. CAUSE: Following Event's CallerFunction differs from setControlValue");
                        }
                    }
                    else {
                        // console.debug("Nothing to skip. CAUSE: Next Event's ID was different from this Event's ID");
                    }
                }
                else {
                    // console.debug("Nothing to skip. CAUSE: Buffer was empty");
                }
            }
            else {
                // console.debug("Nothing to skip. CAUSE: No setControlValue found");
            }

            // Further processing of setRepeatIndex events
            // TODO: check if really not needed anymore
/*
            if (callerFunction == "setRepeatIndex") {
                if (nextPendingClientServerEvent.getRepeatItem() == null) {
                    console.warn("Event (Client to Server) for Dijit Control " + nextPendingTargetId + " skipped. CAUSE: Repeat-Item for being selected has disappeared");
                    continue;
                }

                if (nextPendingClientServerEvent.getValue() != dijit.byNode(nextPendingClientServerEvent.getRepeatItem())._getXFormsPosition()) {
                    console.warn("Original Position: " + nextPendingClientServerEvent.getValue + " New Position: " + nextPendingClientServerEvent.getRepeatItem()._getXFormsPosition());
                    // Update the changed Position of this XForms-Repeat-Item
                    nextPendingclientServerEvent.setValue(dijit.byNode(nextPendingClientServerEvent.getRepeatItem())._getXFormsPosition());
                }
            }
*/

            //*****************************************************************************
            // END:   skip this pending Event, if one of the following conditions occurred:
            //*****************************************************************************

            if (dojoObject != null) {
                this._useLoadingMessage(dojoObject);
            }

            // console.debug("XFProcessor.dispatch event for ",callerFunction);
            switch (callerFunction) {
                case "dispatchEvent":                this.requestPending = true; this._dispatchEvent(nextPendingTargetId); break;
                case "dispatchEventType":        this.requestPending = true; this._dispatchEventType(nextPendingTargetId, nextPendingClientServerEvent.getEventType(), nextPendingClientServerEvent.getContextInfo()); break;
                case "setControlValue":            this.requestPending = true; this._setControlValue(nextPendingTargetId, nextPendingClientServerEvent.getValue()); break;
                //Re-transform the dojo-Id to repeat-Id
                case "setRepeatIndex":            this.requestPending = true; this._setRepeatIndex(nextPendingTargetId, nextPendingClientServerEvent.getValue()); break;
                default:                                        break;
            }
        }
        // console.debug("XFProcessor after Event is dispatched ");
        //Check if there are still more events pending
        if (this.clientServerEventQueue.length != 0) {
            clearTimeout(this.fifoReaderTimer);
            // Just to be sure, that the FIFO Buffer is being checked even in case, that an AJAX-response got lost
            this.fifoReaderTimer = setTimeout("fluxProcessor.eventFifoReader()", 2000);
        }
        else {
            //the last Request has been sent ... stop the timer
            clearTimeout(this.fifoReaderTimer);
        }
    }