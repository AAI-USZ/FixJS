function setupUpdateVDCDialog(){
    $('div#dialogs').append('<div title="Update VDC" id="update_vdc_dialog"></div>');
    $update_vdc_dialog=$('div#update_vdc_dialog',dialogs_context);
    var dialog = $update_vdc_dialog;
    dialog.html(update_vdc_tmpl);
    dialog.dialog({
        autoOpen: false,
        modal: true,
        width: 500
    });


    //Hide VDC resources selects
    $('div#vdc_hosts_lists,div#vdc_vnets_lists,div#vdc_datastores_lists',dialog).hide();

    // Listen to labels of VDC resources
    $('.vdc_show_hide',dialog).click(function(){
        // Switch triangle icon
        $('span',this).toggleClass('ui-icon-triangle-1-s ui-icon-triangle-1-n');

        // The selects boxes' div
        var list = $(this).parent().next();

        // If visible, hide it. Otherwise hide all lists and show this one.
        if (list.is(':visible')) list.fadeOut();
        else {
            $('.dd_lists', list.parent()).hide();
            list.fadeIn();
        }
        return false;
    });

    //Show hosts resources
    $('.vdc_show_hide', dialog).first().trigger('click');

    $('button',dialog).button();
    $('#vdc_update_available_hosts_list',dialog).sortable({
        connectWith : '#vdc_update_selected_hosts_list',
        containment: dialog
    });
    $('#vdc_update_selected_hosts_list',dialog).sortable({
        connectWith : '#vdc_update_available_hosts_list',
        containment: dialog
    });
    $('#vdc_update_available_vnets_list',dialog).sortable({
        connectWith : '#vdc_update_selected_vnets_list',
        containment: dialog
    });
    $('#vdc_update_selected_vnets_list',dialog).sortable({
        connectWith : '#vdc_update_available_vnets_list',
        containment: dialog
    });
    $('#vdc_update_available_datastores_list',dialog).sortable({
        connectWith : '#vdc_update_selected_datastores_list',
        containment: dialog
    });
    $('#vdc_update_selected_datastores_list',dialog).sortable({
        connectWith : '#vdc_update_available_datastores_list',
        containment: dialog
    });

    $('#vdc_update_force',dialog).change(function(){
        select = $('select#vdc_update_id',$update_vdc_dialog);
        if (select.val().length){
            select.trigger("change");
        }
    });

    $('select#vdc_update_id').change(function(){
        var id = $(this).val();
        var zone_id = $('option:selected',this).attr("zone_id");
        var av_hosts=
            $('#vdc_update_available_hosts_list',$update_vdc_dialog);
        var sel_hosts=
            $('#vdc_update_selected_hosts_list',$update_vdc_dialog);
        var av_vnets=
            $('#vdc_update_available_vnets_list',$update_vdc_dialog);
        var sel_vnets=
            $('#vdc_update_selected_vnets_list',$update_vdc_dialog);
        var av_datastores=
            $('#vdc_update_available_datastores_list',$update_vdc_dialog);
        var sel_datastores=
            $('#vdc_update_selected_datastores_list',$update_vdc_dialog);

        if (!id) {
            av_hosts.empty();
            sel_hosts.empty();
            av_vnets.empty();
            sel_vnets.empty();
            av_datastores.empty();
            sel_datastores.empty();
            return true;
        };
        //A VDC has been selected
        //Fill in available hosts column
        //move current hosts to current
        av_hosts.html('<li>'+spinner+'</li>');
        sel_hosts.empty();
        av_vnets.html('<li>'+spinner+'</li>');
        sel_vnets.empty();
        av_datastores.html('<li>'+spinner+'</li>');
        sel_datastores.empty();
        Sunstone.runAction("VDC.update_zone_hosts",zone_id);
        Sunstone.runAction("VDC.update_zone_vnets",zone_id);
        Sunstone.runAction("VDC.update_zone_datastores",zone_id);
    });

    $('#update_vdc_form').submit(function(){
        var force = $('#vdc_update_force',this).length ? "yes" : "nein";
        var id =  $('#vdc_update_id',this).val();

        var hosts=[];
        $('#vdc_update_selected_hosts_list li',this).each(function(){
            hosts.push($(this).attr("host_id"));
        });
        var vnets=[];
        $('#vdc_update_selected_vnets_list li',this).each(function(){
            vnets.push($(this).attr("vnet_id"));
        });
        var datastores=[];
        $('#vdc_update_selected_datastores_list li',this).each(function(){
            datastores.push($(this).attr("datastore_id"));
        });

        var vdc_json = {
            "VDC" : {
                "ID": id,
                "FORCE": force,
                "RESOURCES": {
                    "HOSTS": hosts,
                    "NETWORKS": vnets,
                    "DATASTORES": datastores,
                }
            },
        };

        Sunstone.runAction("VDC.update",id,vdc_json);
        dialog.dialog('close');
        return false;
    });

}