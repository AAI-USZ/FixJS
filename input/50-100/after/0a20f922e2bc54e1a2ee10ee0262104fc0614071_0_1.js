function loadClusters(token) {
    clusters_s = localStorage.getItem('clusters');
    if (clusters_s) {
        clusters = JSON.parse(clusters_s);
	    showClusters(clusters);
    } else {
        setLoadingStatus();
        $.ajax({
            'url' : 'http://api.graphmuse.com:8081/clusters?auth=' + token + '&beta=0.75',
            'dataType' : 'JSON',
            'success' : onClustersReceive,
            'error' : graphMuseError
        });
    }
}