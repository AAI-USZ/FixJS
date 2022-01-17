function(){
    //if we are not oneadmin, our tab will not even be in the DOM.
    dataTable_users = $("#datatable_users",main_tabs_context).dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sPaginationType": "full_numbers",
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "oColVis": {
            "aiExclude": [ 0 ]
        },
        "bAutoWidth":false,
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": ["check"] },
            { "sWidth": "60px", "aTargets": [0] },
            { "sWidth": "35px", "aTargets": [1,5,6,7,8] },
            { "sWidth": "150px", "aTargets": [4] },
            { "bVisible": false, "aTargets": [8]}
        ],
        "oLanguage": (datatable_lang != "") ?
            {
                sUrl: "locale/"+lang+"/"+datatable_lang
            } : ""
    });
    dataTable_users.fnClearTable();
    addElement([
        spinner,
        '','','','','','','',''],dataTable_users);

    Sunstone.runAction("User.list");

    setupCreateUserDialog();
    setupUpdatePasswordDialog();
    setupUserQuotasDialog();
    setUserAutorefresh();
    //Setup quota icons
    //Also for group tab
    setupQuotaIcons();



    initCheckAllBoxes(dataTable_users);
    tableCheckboxesListener(dataTable_users);
    //shortenedInfoFields('#datatable_users');
    infoListener(dataTable_users,'User.showinfo');

    $('div#users_tab div.legend_div').hide();
    $('div#users_tab_non_admin div.legend_div').hide();
}