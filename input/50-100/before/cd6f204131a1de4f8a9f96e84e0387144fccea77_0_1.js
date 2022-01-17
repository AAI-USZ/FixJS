function loadClusters() {
    clusters_s = localStorage.getItem('clusters');
    if (clusters_s) {
        clusters = JSON.parse(clusters_s);
	showClusters(clusters);
    } else {
        setLoadingStatus();
        $.ajax({
            'url' : 'http://api.graphmuse.com:8081/clusters?auth=AAAB01zpxDDcBAGZAl5GXrPqqepF0ZAdzs7CysuZAkj6pK2LH96vh8MLnUT0CVrGq2hI8IfXUIYwcrxGG0zzEu0ez2O4z6GbtWEfq08CQAZDZD&beta=0.75',
            'dataType' : 'JSON',
            'success' : onClustersReceive,
            'error' : graphMuseError
        });
    }
}