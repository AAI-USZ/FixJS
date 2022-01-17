function(){



    /*Init dataTables*/
    dataTable_agg_hosts =  $('#datatable_agg_hosts').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "60px", "aTargets": [5,8] },
            { "sWidth": "35px", "aTargets": [0,2] },
            { "sWidth": "160px", "aTargets": [6,7] },
            { "sWidth": "100px", "aTargets": [1,4] }
        ]
    });

    dataTable_agg_vms = $('#datatable_agg_vms').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0,2] },
            { "sWidth": "60px", "aTargets": [7,8] },
            { "sWidth": "100px", "aTargets": [1,3,4,6,10] }
        ]
    });

    dataTable_agg_vns = $('#datatable_agg_vnets').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "60px", "aTargets": [7,8,9] },
            { "sWidth": "35px", "aTargets": [0,2] },
            { "sWidth": "100px", "aTargets": [1,3,4,6] }
        ]
    });

    dataTable_agg_images = $('#datatable_agg_images').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "60px", "aTargets": [9] },
            { "sWidth": "35px", "aTargets": [0,2,8,10] },
            { "sWidth": "100px", "aTargets": [1,3,4,6,7] }
        ]
    });

    dataTable_agg_templates = $('#datatable_agg_templates').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0,2] },
            { "sWidth": "100px", "aTargets": [1,3,4,6] }
        ]
    });

    dataTable_agg_users = $('#datatable_agg_users').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0,2] },
            { "sWidth": "100px", "aTargets": [1] }
        ]
    });

    dataTable_agg_clusters = $('#datatable_agg_clusters').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0,2] },
            { "sWidth": "100px", "aTargets": [1] }
        ]
    });

    dataTable_agg_datastores = $('#datatable_agg_datastores').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0,2] },
            { "sWidth": "100px", "aTargets": [1,3,4,6] }
        ]
    });

    Sunstone.runAction("ZoneHosts.list");
    Sunstone.runAction("ZoneVMs.list");
    Sunstone.runAction("ZoneVNs.list");
    Sunstone.runAction("ZoneImages.list");
    Sunstone.runAction("ZoneUsers.list");
    Sunstone.runAction("ZoneTemplates.list");
    Sunstone.runAction("ZoneClusters.list");
    Sunstone.runAction("ZoneDatastores.list");

    setAutorefreshes();
}