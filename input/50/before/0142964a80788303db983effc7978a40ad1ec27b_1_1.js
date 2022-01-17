function waitingNodes(dataTable){
    var nodes = dataTable.fnGetData();
    for (var i=0;i<nodes.length;i++){
        dataTable.fnUpdate(spinner,i,0);
    };
}