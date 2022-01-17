function(){

    dataTable_datastores = $("#datatable_datastores",main_tabs_context).dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "oColVis": {
            "aiExclude": [ 0 ]
        },
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": ["check"] },
            { "sWidth": "60px", "aTargets": [0] },
            { "sWidth": "35px", "aTargets": [1] },
            { "sWidth": "100px", "aTargets": [2,3,5,7,8] },
            { "bVisible": false, "aTargets": [6,7,8] }
        ],
        "oLanguage": (datatable_lang != "") ?
            {
                sUrl: "locale/"+lang+"/"+datatable_lang
            } : ""
    });

    dataTable_datastores.fnClearTable();
    addElement([
        spinner,
        '','','','','','','',''],dataTable_datastores);
    Sunstone.runAction("Datastore.list");

    setupCreateDatastoreDialog();
    setupDatastoreTemplateUpdateDialog();
    setDatastoreAutorefresh();

    initCheckAllBoxes(dataTable_datastores);
    tableCheckboxesListener(dataTable_datastores);
    infoListener(dataTable_datastores,'Datastore.showinfo');

    // Reset filter in case the view was filtered because it was accessed
    // from a single cluster.
    $('div#menu li#li_datastores_tab').live('click',function(){
        dataTable_datastores.fnFilter('',5);
    });

    $('div#datastores_tab div.legend_div').hide();
}