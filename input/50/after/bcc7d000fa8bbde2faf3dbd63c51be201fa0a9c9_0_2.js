function checkNetworkState(networkState) {
    if (networkState == Connection.NONE) {
        alert("Network is unavailable.  " + TRY_AGAIN_MSG)
    } else {
        fetchData();
    }
}