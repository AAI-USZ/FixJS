function updateZoneInfo(req,zone_json){
    var zone = zone_json.ZONE;

    var info_tab = {
        title : "Zone information",
        content :
        '<table id="info_zone_table" class="info_table">\
            <thead>\
               <tr><th colspan="2">Zone information - '+zone.NAME+'</th></tr>\
            </thead>\
            <tbody>\
            <tr>\
                <td class="key_td">ID</td>\
                <td class="value_td">'+zone.ID+'</td>\
            </tr>\
            <tr>\
                <td class="key_td">Administrator</td>\
                <td class="value_td">'+zone.ONENAME+'</td>\
            </tr>\
            <tr>\
                <td class="key_td">Password</td>\
                <td class="value_td">'+zone.ONEPASS+'</td>\
            </tr>\
            <tr>\
                <td class="key_td">Endpoint</td>\
                <td class="value_td">'+zone.ENDPOINT+'</td>\
            </tr>\
            <tr>\
                <td class="key_td">Sunstone endpoint</td>\
                <td class="value_td">'+ (zone.SUNSENDPOINT.length? '<a href="'+zone.SUNSENDPOINT+'" target="_blank">'+zone.SUNSENDPOINT+'<span class="ui-icon ui-icon-extlink" style="display:inline-block;" /></a>' : "") +'</td>\
            </tr>\
            <tr>\
                <td class="key_td">SelfService endpoint</td>\
                <td class="value_td">'+ (zone.SELFENDPOINT.length? '<a href="'+zone.SELFENDPOINT+'" target="_blank">'+zone.SELFENDPOINT+'<span class="ui-icon ui-icon-extlink" style="display:inline-block;" /></a>' : "") +'</td>\
            </tr>\
            <tr>\
                <td class="key_td">#VDCs</td>\
                <td class="value_td">'+zone.VDCS.length+'</td>\
            </tr>\
            </tbody>\
         </table>'
    };
    var hosts_tab = {
        title : "Hosts",
        content :
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_hosts" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Name</th>\
      <th>Cluster</th>\
      <th>Running VMs</th>\
      <th>Used CPU</th>\
      <th>Used Memory</th>\
      <th>Status</th>\
      <th>IM MAD</th>\
      <th>VM MAD</th>\
      <th>Last monitored on</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table></div>'
    };

    var templates_tab = {
        title: "Templates",
        content :
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_templates" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Owner</th>\
      <th>Group</th>\
      <th>Name</th>\
      <th>Registration time</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table></div>'
    };

    var vms_tab = {
        title : "Virtual Machines",
        content :
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_vms" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Owner</th>\
      <th>Group</th>\
      <th>Name</th>\
      <th>Status</th>\
      <th>Used CPU</th>\
      <th>Used Memory</th>\
      <th>Host</th>\
      <th>IPs</th>\
      <th>Start Time</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table></div>'
    };

    var vnets_tab = {
        title : "Virtual Networks",
        content :
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_vnets" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Owner</th>\
      <th>Group</th>\
      <th>Name</th>\
      <th>Cluster</th>\
      <th>Type</th>\
      <th>Bridge</th>\
      <th>Total Leases</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table></div>'
    };

    var images_tab = {
        title : "Images",
        content :
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_images" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Owner</th>\
      <th>Group</th>\
      <th>Name</th>\
      <th>Datastore</th>\
      <th>Size</th>\
      <th>Type</th>\
      <th>Registration time</th>\
      <th>Persistent</th>\
      <th>State</th>\
      <th>#VMS</th>\
      <th>Target</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table></div>'
    };

    var users_tab = {
        title: "Users",
        content:
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_users" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Name</th>\
      <th>Group</th>\
      <th>Auth driver</th>\
      <th>VMS</th>\
      <th>Memory</th>\
      <th>CPU</th>\
      <th>GID</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table>\
</div>'
    };

    var clusters_tab = {
        title: "Clusters",
        content:
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_clusters" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Name</th>\
      <th>Hosts</th>\
      <th>Virtual Networks</th>\
      <th>Datastores</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table>\
</div>'
    };

    var datastores_tab = {
        title: "Datastores",
        content:
'<div style="padding: 10px 10px;">\
<table id="datatable_zone_datastores" class="display">\
  <thead>\
    <tr>\
      <th>ID</th>\
      <th>Owner</th>\
      <th>Group</th>\
      <th>Name</th>\
      <th>Cluster</th>\
      <th>Basepath</th>\
      <th>TM MAD</th>\
      <th>DS MAD</th>\
      <th>System</th>\
    </tr>\
  </thead>\
  <tbody>\
  </tbody>\
</table>\
</div>'
    };

    Sunstone.updateInfoPanelTab("zone_info_panel","zone_info_tab",info_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_hosts_tab",hosts_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_templates_tab",templates_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_vms_tab",vms_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_vnets_tab",vnets_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_images_tab",images_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_users_tab",users_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_clusters_tab",clusters_tab);
    Sunstone.updateInfoPanelTab("zone_info_panel","zone_datastores_tab",datastores_tab);

    //Pop up the info we have now.
    Sunstone.popUpInfoPanel("zone_info_panel");


   /*Init dataTables*/
    $('#datatable_zone_hosts').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "60px", "aTargets": [3,6] },
            { "sWidth": "100px", "aTargets": [2,7,8,9] },
            { "sWidth": "35px", "aTargets": [0] },
            { "sWidth": "200px", "aTargets": [4,5] },
            { "bVisible" : false, "aTargets": [7,8,9] }
        ]
    });

    $('#datatable_zone_vms').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0] },
            { "sWidth": "60px", "aTargets": [5,6] },
            { "sWidth": "100px", "aTargets": [1,2,4,8] },
            { "bVisible" : false, "aTargets": [5,6,9] }
        ]
    });


    $('#datatable_zone_vnets').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sPaginationType": "full_numbers",
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "aoColumnDefs": [
            { "sWidth": "60px", "aTargets": [5,6,7] },
            { "sWidth": "35px", "aTargets": [0] },
            { "sWidth": "100px", "aTargets": [1,2,4] },
            { "bVisible" : false, "aTargets": [6] }
        ]
    });

    $('#datatable_zone_images').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "60px", "aTargets": [9] },
            { "sWidth": "35px", "aTargets": [0,5,8,10,11] },
            { "sWidth": "100px", "aTargets": [1,2,4,6,7] },
            { "bVisible" : false, "aTargets": [5,7,11] }
        ]
    });

    $('#datatable_zone_templates').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0] },
            { "sWidth": "100px", "aTargets": [1,2,4] }
        ]
    });

    $('#datatable_zone_users').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "sPaginationType": "full_numbers",
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0,4,5,6,7] },
            { "sWidth": "150px", "aTargets": [3] },
            { "bVisible" : false, "aTargets": [7] }
        ]
    });

    $('#datatable_zone_clusters').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0,2,3,4] },
        ]
    });

    $('#datatable_zone_datastores').dataTable({
        "bJQueryUI": true,
        "bSortClasses": false,
        "bAutoWidth":false,
        "sDom" : '<"H"lfrC>t<"F"ip>',
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            { "sWidth": "35px", "aTargets": [0] },
            { "sWidth": "100px", "aTargets": [1,2,4,6,7,8] },
            { "bVisible" : false, "aTargets": [5,6,7,8] }
        ]
    });

    /*End init dataTables*/

    //Retrieve pools in the meantime
    Sunstone.runAction("Zone.host",zone.ID);
    Sunstone.runAction("Zone.vmtemplate",zone.ID);
    Sunstone.runAction("Zone.vms",zone.ID);
    Sunstone.runAction("Zone.vnet",zone.ID);
    Sunstone.runAction("Zone.image",zone.ID);
    Sunstone.runAction("Zone.user",zone.ID);
    Sunstone.runAction("Zone.cluster",zone.ID);
    Sunstone.runAction("Zone.datastore",zone.ID);
}