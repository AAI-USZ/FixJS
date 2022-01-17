function monitorClusters(list){
    var clustered_hosts = { "-" : []}

    //extract current clusters from table
    //and initialize the object in which hosts will be divided
    var cluster_list = dataTable_clusters.fnGetData();
    $.each(cluster_list,function(){
        clustered_hosts[this[1]] = []
    });

    for (var i = 0; i < list.length; i++){
        var cluster_id = list[i].HOST.CLUSTER_ID;
        if (!clustered_hosts[cluster_id])
            clustered_hosts[cluster_id] = [{ CLUSTER_HOST : list[i].HOST }];
        else
            clustered_hosts[cluster_id].push({ CLUSTER_HOST : list[i].HOST })
    }
    for (cluster in clustered_hosts){
        SunstoneMonitoringConfig.CLUSTER_HOST.cluster_id = cluster;
        SunstoneMonitoring.monitor('CLUSTER_HOST', clustered_hosts[cluster]);
    }
}