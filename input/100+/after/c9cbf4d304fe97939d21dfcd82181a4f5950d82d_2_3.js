function(targetId, eventType, contextInfo) {
        if((this.usesDOMFocusOUT == false && "DOMFocusOut" == eventType) ||
           (this.usesDOMFocusIN == false && "DOMFocusIn" == eventType) ||
            (this.useXFSelect == false && "xformsSelect" == eventType)){
            console.info("XFProcessor.dispatchEventType: event:",eventType, " is disabled in form!! targetId is: ",targetId);
            return;

        }
        // change clientside eventType xformsSelect to DOMActivate for the Java processor
        if(eventType == "xformsSelect"){
            eventType = "DOMActivate";
        }
        // console.debug("XFProcessor.dispatchEventType(",targetId,") this: ", this, " eventType:",eventType, " contextInfo:",contextInfo);
        var newClientServerEvent = new ClientServerEvent();
        newClientServerEvent.setTargetId(targetId);
        newClientServerEvent.setEventType(eventType);
        newClientServerEvent.setContextInfo(contextInfo);
        newClientServerEvent.setCallerFunction("dispatchEventType");
        this.eventFifoWriter(newClientServerEvent);
    }