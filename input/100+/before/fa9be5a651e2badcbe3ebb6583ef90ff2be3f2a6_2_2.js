function setupCreateVDCDialog(){
    $('div#dialogs').append('<div title="Create VDC" id="create_vdc_dialog"></div>');
    var dialog = $('div#create_vdc_dialog');
    dialog.html(create_vdc_tmpl);

    var height = Math.floor($(window).height()*0.8);

    dialog.dialog({
        autoOpen: false,
        modal: true,
        height: height,
        width: 500
    });

    $('div#vdc_hosts_lists,div#vdc_vnets_lists,div#vdc_datastores_lists',dialog).hide();
    $('.vdc_show_hide',dialog).click(function(){
        $('span',this).toggleClass('ui-icon-triangle-1-s ui-icon-triangle-1-n');
        $(this).parent().next().toggle();
    });

    $('button',dialog).button();
    $('#vdc_available_hosts_list',dialog).sortable({
        connectWith : '#vdc_selected_hosts_list',
        containment: dialog
    });
    $('#vdc_selected_hosts_list',dialog).sortable({
        connectWith : '#vdc_available_hosts_list',
        containment: dialog
    });
    $('#vdc_available_vnets_list',dialog).sortable({
        connectWith : '#vdc_selected_vnets_list',
        containment: dialog
    });
    $('#vdc_selected_vnets_list',dialog).sortable({
        connectWith : '#vdc_available_vnets_list',
        containment: dialog
    });
    $('#vdc_available_datastores_list',dialog).sortable({
        connectWith : '#vdc_selected_datastores_list',
        containment: dialog
    });
    $('#vdc_selected_datastores_list',dialog).sortable({
        connectWith : '#vdc_available_datastores_list',
        containment: dialog
    });

    $('input#vdc_force',dialog).change(function(){
        select = $('div#create_vdc_dialog select#clusterid');
        if (select.val().length){
            select.trigger("change");
        };
    });

    //load zone hosts
    $('select#zoneid',dialog).change(function(){
        var id=$(this).val();
        if (!id) {
            $('select#clusterid').html('<option value="">Select zone</option>');
            $('select#clusterid').trigger('change');
            return true;
        };
        $('select#clusterid').html('<option value="">Loading...</option>');
        $('select#clusterid').trigger('change');
        Sunstone.runAction("VDC.zone_clusters",id);
    });

    $('select#clusterid',dialog).change(function(){
        var context = $('div#create_vdc_dialog');
        var id=$('select#zoneid',context).val();
        var clusterid=$(this).val();
        var av_hosts=
            $('#vdc_available_hosts_list', context);
        var sel_hosts=
            $('#vdc_selected_hosts_list', context);
        var av_vnets=
            $('#vdc_available_vnets_list', context);
        var sel_vnets=
            $('#vdc_selected_vnets_list', context);
        var av_datastores=
            $('#vdc_available_datastores_list', context);
        var sel_datastores=
            $('#vdc_selected_datastores_list', context);

        if (!clusterid){
            av_hosts.empty();
            sel_hosts.empty();
            av_vnets.empty();
            sel_vnets.empty();
            av_datastores.empty();
            sel_datastores.empty();
            return true;
        }
        av_hosts.html('<li>'+spinner+'</li>');
        av_vnets.html('<li>'+spinner+'</li>');
        av_datastores.html('<li>'+spinner+'</li>');
        sel_hosts.empty();
        sel_vnets.empty();
        sel_datastores.empty();
        Sunstone.runAction("VDC.zone_hosts",id);
        Sunstone.runAction("VDC.zone_vnets",id);
        Sunstone.runAction("VDC.zone_datastores",id);
    });

    $('#create_vdc_form', dialog).submit(function(){
        var name = $('#name',this).val();
        var vdcadminname = $('#vdcadminname',this).val();
        var vdcadminpass = $('#vdcadminpass',this).val();
        var zoneid = $('select#zoneid',this).val();
        var clusterid = $('select#clusterid',this).val();
        var force = $('#vdc_force',this).is(':checked') ? "yes" : "please no";
        if (!name || !vdcadminname
            || !vdcadminpass || !zoneid || !clusterid){
            notifyError("Name, administrator, credentials, zone and cluster are mandatory parameters");
            return false;
        }
        var hosts=[];
        $('#vdc_selected_hosts_list li',$(this)).each(function(){
            hosts.push($(this).attr("host_id"));
        });
        var vnets=[];
        $('#vdc_selected_vnets_list li',$(this)).each(function(){
            vnets.push($(this).attr("vnet_id"));
        });
        var datastores=[];
        $('#vdc_selected_datastores_list li',$(this)).each(function(){
            datastores.push($(this).attr("datastore_id"));
        });

        var vdc_json = {
            "VDC" : {
                "NAME" : name,
                "ZONE_ID" : zoneid,
                "VDCADMINNAME" : vdcadminname,
                "VDCADMINPASS" : vdcadminpass,
                "FORCE" : force,
                "CLUSTER_ID" : clusterid,
                "RESOURCES" : {
                    "HOSTS" : hosts,
                    "DATASTORES" : datastores,
                    "NETWORKS" : vnets,
                },
            }
        };

        Sunstone.runAction("VDC.create",vdc_json);
        dialog.dialog('close');
        return false;
    });
}