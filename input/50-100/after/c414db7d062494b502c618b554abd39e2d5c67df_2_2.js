function updateClustersView (request,list){
    var list_array = [];

    $.each(list,function(){
        //Grab table data from the list
        list_array.push(clusterElementArray(this));
    });

    //Remove the menus as we recreate them again.
    removeClusterMenus();
    newClusterMenu(list);

    updateView(list_array,dataTable_clusters);
    updateClusterSelect();
    //dependency with the infraestructure dashboard plugin
    updateInfraDashboard("clusters",list);
}