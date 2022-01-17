function hostElementArray(host,zone_id,zone_name){

    host = host.HOST;

    //Calculate some values
    var acpu = parseInt(host.HOST_SHARE.MAX_CPU);
    if (!acpu) {acpu=100};
    acpu = acpu - parseInt(host.HOST_SHARE.CPU_USAGE);

    var total_mem = parseInt(host.HOST_SHARE.MAX_MEM);
    var free_mem = parseInt(host.HOST_SHARE.FREE_MEM);

    var ratio_mem = 0;
    if (total_mem) {
        ratio_mem = Math.round(((total_mem - free_mem) / total_mem) * 100);
    }


    var total_cpu = parseInt(host.HOST_SHARE.MAX_CPU);
    var used_cpu = Math.max(total_cpu - parseInt(host.HOST_SHARE.USED_CPU),acpu);

    var ratio_cpu = 0;
    if (total_cpu){
        ratio_cpu = Math.round(((total_cpu - used_cpu) / total_cpu) * 100);
    }


    //progressbars html code - hardcoded jquery html result
     var pb_mem =
'<div style="height:10px" class="ratiobar ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+ratio_mem+'">\
    <div class="ui-progressbar-value ui-widget-header ui-corner-left ui-corner-right" style="width: '+ratio_mem+'%;"/>\
    <span style="position:relative;left:68px;top:-4px;font-size:0.6em">'+ratio_mem+'%</span>\
    </div>\
</div>';

    var pb_cpu =
'<div style="height:10px" class="ratiobar ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+ratio_cpu+'">\
    <div class="ui-progressbar-value ui-widget-header ui-corner-left ui-corner-right" style="width: '+ratio_cpu+'%;"/>\
    <span style="position:relative;left:68px;top:-4px;font-size:0.6em">'+ratio_cpu+'%</span>\
    </div>\
</div>';

    if (zone_id){
        return [
            zone_id,
            zone_name,
            host.ID,
            host.NAME,
            host.CLUSTER.length ? host.CLUSTER : "-",
            host.HOST_SHARE.RUNNING_VMS, //rvm
            pb_cpu,
            pb_mem,
            oZones.Helper.resource_state("host_simple",host.STATE) ];
    };

    return [
        host.ID,
        host.NAME,
        host.CLUSTER.length ? host.CLUSTER : "-",
        host.HOST_SHARE.RUNNING_VMS, //rvm
        pb_cpu,
        pb_mem,
        oZones.Helper.resource_state("host_simple",host.STATE) ];
}