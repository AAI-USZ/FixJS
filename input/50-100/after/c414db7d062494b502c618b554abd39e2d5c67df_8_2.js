function updateHostsView (request,host_list){
    var host_list_array = [];

    $.each(host_list,function(){
        //Grab table data from the host_list
        host_list_array.push(hostElementArray(this));
    });

    SunstoneMonitoring.monitor('HOST', host_list)

    //if clusters_sel is there, it means the clusters have arrived.
    //Otherwise do not attempt to monitor them.
    if (typeof(monitorClusters) != 'undefined' && clusters_sel())
        monitorClusters(host_list)
    updateView(host_list_array,dataTable_hosts);
    updateHostSelect();
    //dependency with the dashboard plugin
    updateInfraDashboard("hosts",host_list);
}