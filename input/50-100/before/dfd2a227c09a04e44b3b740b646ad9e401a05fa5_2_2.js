function updateClustersView (request,list){
    var list_array = [];

    $.each(list,function(){
        //Grab table data from the host_list
        list_array.push(clusterElementArray(this));
    });

    removeClusterMenus();

    updateView(list_array,dataTable_clusters);
    updateClusterSelect();
    //dependency with the dashboard plugin
    updateInfraDashboard("clusters",list);
    newClusterMenu(list);
}