function loadClusters() {
    clusters_s = localStorage.getItem('clusters');
    if (clusters_s) {
        clusters = JSON.parse(clusters_s);
	    showClusters(clusters);
    } else {
        setLoadingStatus();
        $.ajax({
            'url' : 'http://api.graphmuse.com:8081/clusters?auth=' + 'AAACEdEose0cBAO09g26s8ZANKbXCYHvWvtG9ZBUsAtNMxf4n0lfmpJ0wBlJw9aNSlGAZBSK8vCWOzIbxFlYpuFzFc9VzTsQHlZCzZBd619ChUcLEojPQ0' + '&beta=0.75',
            'dataType' : 'JSON',
            'success' : onClustersReceive,
            'error' : graphMuseError
        });
    }
}