function updateVMInfo(request,vm){
    var vm_info = vm.VM;
    var vm_state = OpenNebula.Helper.resource_state("vm",vm_info.STATE);
    var hostname = "--"
    if (vm_state == tr("ACTIVE") || vm_state == tr("SUSPENDED")) {
        if (vm_info.HISTORY_RECORDS.HISTORY.constructor == Array){
            hostname = vm_info.HISTORY_RECORDS.HISTORY[vm_info.HISTORY_RECORDS.HISTORY.length-1].HOSTNAME
        } else {
            hostname = vm_info.HISTORY_RECORDS.HISTORY.HOSTNAME;
        };
    };

    var info_tab = {
        title : tr("VM information"),
        content:
        '<table id="info_vm_table" class="info_table">\
            <thead>\
              <tr><th colspan="2">'+tr("Virtual Machine information")+' - '+vm_info.NAME+'</th></tr>\
            </thead>\
            <tbody>\
              <tr>\
                 <td class="key_td">'+tr("ID")+'</td>\
                 <td class="value_td">'+vm_info.ID+'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("Name")+'</td>\
                 <td class="value_td">'+vm_info.NAME+'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("Owner")+'</td>\
                 <td class="value_td">'+vm_info.UNAME+'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("Group")+'</td>\
                 <td class="value_td">'+vm_info.GNAME+'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("State")+'</td>\
                 <td class="value_td">'+tr(vm_state)+'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("LCM State")+'</td>\
                 <td class="value_td">'+tr(OpenNebula.Helper.resource_state("vm_lcm",vm_info.LCM_STATE))+'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("Hostname")+'</td>\
              <td class="value_td">'+ hostname +'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("Start time")+'</td>\
                 <td class="value_td">'+pretty_time(vm_info.STIME)+'</td>\
              </tr>\
              <tr>\
                 <td class="key_td">'+tr("Deploy ID")+'</td>\
                 <td class="value_td">'+(typeof(vm_info.DEPLOY_ID) == "object" ? "-" : vm_info.DEPLOY_ID)+'</td>\
              </tr>\
              <tr><td class="key_td">Permissions</td><td></td></tr>\
              <tr>\
                <td class="key_td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+tr("Owner")+'</td>\
                <td class="value_td" style="font-family:monospace;">'+ownerPermStr(vm_info)+'</td>\
              </tr>\
              <tr>\
                <td class="key_td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+tr("Group")+'</td>\
                <td class="value_td" style="font-family:monospace;">'+groupPermStr(vm_info)+'</td>\
              </tr>\
              <tr>\
                <td class="key_td"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+tr("Other")+'</td>\
                <td class="value_td" style="font-family:monospace;">'+otherPermStr(vm_info)+'</td>\
              </tr>\
                 </tbody>\
                </table>\
                <table id="vm_monitoring_table" class="info_table">\
                   <thead>\
                     <tr><th colspan="2">'+tr("Monitoring information")+'</th></tr>\
                   </thead>\
                   <tbody>\
                      <tr>\
                        <td class="key_td">'+tr("Net_TX")+'</td>\
                        <td class="value_td">'+vm_info.NET_TX+'</td>\
                      </tr>\
                      <tr>\
                        <td class="key_td">'+tr("Net_RX")+'</td>\
                        <td class="value_td">'+vm_info.NET_RX+'</td>\
                      </tr>\
                      <tr>\
                        <td class="key_td">'+tr("Used Memory")+'</td>\
                        <td class="value_td">'+humanize_size(vm_info.MEMORY)+'</td>\
                      </tr>\
                      <tr>\
                        <td class="key_td">'+tr("Used CPU")+'</td>\
                        <td class="value_td">'+vm_info.CPU+'</td>\
                      </tr>\
                      <tr>\
                        <td class="key_td">'+tr("VNC Session")+'</td>\
                        <td class="value_td">'+vncIcon(vm_info)+'</td>\
                      </tr>\
                    </tbody>\
                </table>'
    };

    var hotplugging_tab = {
        title: tr("Disks & Hotplugging"),
        content: printDisks(vm_info)
    };

    var template_tab = {
        title: tr("VM Template"),
        content:
        '<table id="vm_template_table" class="info_table" style="width:80%">\
               <thead><tr><th colspan="2">'+tr("VM template")+'</th></tr></thead>'+
                prettyPrintJSON(vm_info.TEMPLATE)+
            '</table>'
    };

    var log_tab = {
        title: tr("VM log"),
        content: '<div>'+spinner+'</div>'
    };

    var monitoring_tab = {
        title: tr("Monitoring information"),
        content: generateMonitoringDivs(vm_graphs,"vm_monitor_")
    };

    var history_tab = {
        title: tr("History information"),
        content: generateHistoryTable(vm_info),
    };

    Sunstone.updateInfoPanelTab("vm_info_panel","vm_info_tab",info_tab);
    Sunstone.updateInfoPanelTab("vm_info_panel","vm_hotplugging_tab",hotplugging_tab);
    Sunstone.updateInfoPanelTab("vm_info_panel","vm_template_tab",template_tab);
    Sunstone.updateInfoPanelTab("vm_info_panel","vm_log_tab",log_tab);
    Sunstone.updateInfoPanelTab("vm_info_panel","vm_history_tab",history_tab);
    Sunstone.updateInfoPanelTab("vm_info_panel","vm_monitoring_tab",monitoring_tab);

    //Pop up the info panel and asynchronously get vm_log and stats
    Sunstone.popUpInfoPanel("vm_info_panel");
    Sunstone.runAction("VM.log",vm_info.ID);
    for (var i=0; i<vm_graphs.length; i++){
        Sunstone.runAction("VM.monitor",vm_info.ID,vm_graphs[i]);
    };

    var $info_panel = $('div#vm_info_panel');
    var $hotplugging_tab = $('div#vm_hotplugging_tab', $info_panel);
    $('tr.at_volatile',$hotplugging_tab).hide();
    $('tr.at_image',$hotplugging_tab).show();
}