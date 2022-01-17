function vdcElementArray(vdc_json){
    var vdc = vdc_json.VDC;

    return [
        '<input class="check_item" type="checkbox" id="vdc_'+vdc.ID+'" name="selected_items" value="'+vdc.ID+'"/>',
        vdc.ID,
        vdc.NAME,
        vdc.ZONES_ID,
        vdc.CLUSTER_ID,
        vdc.RESOURCES.HOSTS.length ? vdc.RESOURCES.HOSTS.join() : "none",
        vdc.RESOURCES.NETWORKS.length ? vdc.RESOURCES.NETWORKS.join() : "none",
        vdc.RESOURCES.DATASTORES.length ? vdc.RESOURCES.DATASTORES.join() : "none",
    ];
}