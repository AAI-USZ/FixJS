function(){
    dataTable_groups = $("#datatable_groups",main_tabs_context).dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": ["check"] },
            { "sWidth": "60px", "aTargets": [0] },
            { "sWidth": "35px", "aTargets": [1,4,5,6] }
        ],
        "oLanguage": (datatable_lang != "") ?
            {
                sUrl: "locale/"+lang+"/"+datatable_lang
            } : ""
    });

    dataTable_groups.fnClearTable();
    addElement([
        spinner,
        '','','','','',''],dataTable_groups);

    Sunstone.runAction("Group.list");
    setupCreateGroupDialog();
    setupGroupQuotasDialog();
    setGroupAutorefresh();

    initCheckAllBoxes(dataTable_groups);
    tableCheckboxesListener(dataTable_groups);
    infoListener(dataTable_groups, 'Group.showinfo');

    $('div#groups_tab div.legend_div').hide();
    $('div#groups_tab_non_admin div.legend_div').hide();
}