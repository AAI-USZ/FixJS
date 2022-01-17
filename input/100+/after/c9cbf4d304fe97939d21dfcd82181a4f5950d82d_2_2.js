function(clientServerEvent) {
        // console.debug("XFProcessor.eventFifoWriter clientServerEvent:",clientServerEvent);

        //insert the new clientServerEvent at the beginning of the Buffer
        this.clientServerEventQueue.push(clientServerEvent);
        switch (clientServerEvent) {
            case "dispatchEvent":      console.info("FIFO-WRITE: dispatchEvent(" + clientServerEvent.getTargetId() + ")"); break;
            case "dispatchEventType":  console.info("FIFO-WRITE: dispatchEventType(" + clientServerEvent.getTargetId() + ", " + clientServerEvent.getEventType() + ", " + clientServerEvent.getContextInfo() + ")"); break;
            case "setControlValue":    console.info("FIFO-WRITE: setControlValue(" + clientServerEvent.getTargetId() + ", " + clientServerEvent.getValue() + ")"); break;
            case "setRepeatIndex":     console.info("FIFO-WRITE: setRepeatIndex(" + clientServerEvent.getTargetId() + ", " + clientServerEvent.getValue() + ")"); break;
            default:                   break;
        }
        //schedule the next try for reading the next pending Event of the FIFO-Buffer
        clearTimeout(this.fifoReaderTimer);
        this.fifoReaderTimer = setTimeout("fluxProcessor.eventFifoReader()", 0);
    }