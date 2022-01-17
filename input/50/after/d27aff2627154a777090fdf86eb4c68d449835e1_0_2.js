function() {
        //alert("device is ready - jquery)");
        var networkState = navigator.network.connection.type;
        checkNetworkState(networkState);
    }