function cI_cGR_getInterfaces (aCount) {
        var ifaces = [
            Components.interfaces.nsISupports,
            Components.interfaces.calIGoogleRequest,
            Components.interfaces.calIOperation,
            Components.interfaces.nsIStreamLoaderObserver,
            Components.interfaces.nsIInterfaceRequestor,
            Components.interfaces.nsIChannelEventSink,
            Components.interfaces.nsIClassInfo
        ];
        aCount.value = ifaces.length;
        return ifaces;
    }