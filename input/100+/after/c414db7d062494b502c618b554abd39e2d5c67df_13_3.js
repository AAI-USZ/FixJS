function(){

    dataTable_vNetworks = $("#datatable_vnetworks",main_tabs_context).dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "oColVis": {
            "aiExclude": [ 0 ]
        },
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": ["check"] },
            { "sWidth": "60px", "aTargets": [0,6,7,8] },
            { "sWidth": "35px", "aTargets": [1] },
            { "sWidth": "100px", "aTargets": [2,3,5] },
            { "bVisible": false, "aTargets": [7]}
        ],
        "oLanguage": (datatable_lang != "") ?
            {
                sUrl: "locale/"+lang+"/"+datatable_lang
            } : ""
    });

    dataTable_vNetworks.fnClearTable();
    addElement([
        spinner,
        '','','','','','','',''],dataTable_vNetworks);
    Sunstone.runAction("Network.list");

    setupCreateVNetDialog();
    setupVNetTemplateUpdateDialog();
    setupLeasesOps();
    setVNetAutorefresh();

    initCheckAllBoxes(dataTable_vNetworks);
    tableCheckboxesListener(dataTable_vNetworks);
    infoListener(dataTable_vNetworks,'Network.showinfo');

    // Reset list filter in case it was set because we were lookin
    // at a single cluster view
    $('div#menu li#li_vnets_tab').live('click',function(){
        dataTable_vNetworks.fnFilter('',5);
    });

    $('div#vnets_tab div.legend_div').hide();
}