function(){

    //prepare host datatable
    dataTable_clusters = $("#datatable_clusters",main_tabs_context).dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "oColVis": {
            "aiExclude": [ 0 ]
        },
        "bAutoWidth":false,
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": ["check"] },
            { "sWidth": "60px", "aTargets": [0] },
            { "sWidth": "35px", "aTargets": [1] },
        ],
        "oLanguage": (datatable_lang != "") ?
            {
                sUrl: "locale/"+lang+"/"+datatable_lang
            } : ""
    });

    //preload it
    dataTable_clusters.fnClearTable();
    addElement([
        spinner,
        '','',''],dataTable_clusters);
    Sunstone.runAction("Cluster.list");

    setupCreateClusterDialog();

    setClusterAutorefresh();

    clusterResourceViewListeners();

    initCheckAllBoxes(dataTable_clusters);
    tableCheckboxesListener(dataTable_clusters);
    infoListener(dataTable_clusters);
}