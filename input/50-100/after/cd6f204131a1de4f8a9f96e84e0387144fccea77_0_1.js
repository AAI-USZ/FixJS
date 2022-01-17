function loadClusters() {
    clusters_s = localStorage.getItem('clusters');
    if (clusters_s) {
        clusters = JSON.parse(clusters_s);
	showClusters(clusters);
    } else {
        setLoadingStatus();
        $.ajax({
            'url' : 'http://api.graphmuse.com:8081/clusters?auth=AAACEdEose0cBAJHw26K9QhZBfOpLE0HKCDbIzfUKklgByZCfX9O6WStV7LK4cJzLBa1AoxNAanBigOua4c6pesOeuPLtKPhooPxVSByAcWHEoGUxI2&beta=0.75',
            'dataType' : 'JSON',
            'success' : onClustersReceive,
            'error' : graphMuseError
        });
    }
}