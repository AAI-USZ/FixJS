function checkNetworkState(networkState) {
    if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
        alert("No network connection detected.  " + TRY_AGAIN_MSG)
    } else {
        $('#tempNetworkType').html("Connection type: " + networkState);
        fetchData();
    }
}