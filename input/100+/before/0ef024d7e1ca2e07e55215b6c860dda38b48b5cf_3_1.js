function clusterTabContent(cluster_json) {
    var cluster = cluster_json.CLUSTER;
    var hosts_n = 0;
    var dss_n = 0;
    var vnets_n = 0;

    if (cluster.DATASTORES.ID &&
        cluster.DATASTORES.ID.constructor == Array){
        dss_n = cluster.DATASTORES.ID.length;
    } else if (cluster.DATASTORES.ID)
        dss_n = 1;

    if (cluster.HOSTS.ID &&
        cluster.HOSTS.ID.constructor == Array){
        hosts_n = cluster.HOSTS.ID.length;
    } else if (cluster.HOSTS.ID)
        hosts_n = 1;

    if (cluster.VNETS.ID &&
        cluster.VNETS.ID.constructor == Array){
        vnets_n = cluster.VNETS.ID.length;
    } else if (cluster.VNETS.ID)
        vnets_n = 1;

/*
    var dss_list = '<li class="clusterElemLi">'+tr("No datastores in this cluster")+'</li>';
    if (cluster.DATASTORES.ID &&
        cluster.DATASTORES.ID.constructor == Array){
        dss_list = '';
        for (var i=0; i<cluster.DATASTORES.ID.length;i++){
            dss_list += '<li class="clusterElemLi">'+cluster.DATASTORES.ID[i]+' - '+getDatastoreName(cluster.DATASTORES.ID[i])+'</li>';
        };
    } else if (cluster.DATASTORES.ID)
        dss_list = '<li class="clusterElemLi">'+cluster.DATASTORES.ID+' - '+getDatastoreName(cluster.DATASTORES.ID)+'</li>';

    var hosts_list = '<li class="clusterElemLi">'+tr("No hosts in this cluster")+'</li>';
    if (cluster.HOSTS.ID &&
        cluster.HOSTS.ID.constructor == Array){
        hosts_list = '';
        for (var i=0; i<cluster.HOSTS.ID.length;i++){
            hosts_list += '<li class="clusterElemLi">'+cluster.HOSTS.ID[i]+' - '+getHostName(cluster.HOSTS.ID[i])+'</li>';
        };
    } else if (cluster.HOSTS.ID)
        hosts_list = '<li class="clusterElemLi">'+cluster.HOSTS.ID+' - '+getHostName(cluster.HOSTS.ID)+'</li>';

    var vnets_list = '<li class="clusterElemLi">'+tr("No virtual networks in this cluster")+'</li>';
    if (cluster.VNETS.ID &&
        cluster.VNETS.ID.constructor == Array){
        vnets_list = '';
        for (var i=0; i<cluster.VNETS.ID.length;i++){
            vnets_list += '<li class="clusterElemLi">'+cluster.VNETS.ID[i]+' - '+getVNetName(cluster.VNETS.ID[i])+'</li>';
        };
    } else if (cluster.VNETS.ID)
        vnets_list = '<li class="clusterElemLi">'+cluster.VNETS.ID+' - '+getVNetName(cluster.VNETS.ID)+'</li>';
*/

    //special case for cluster none, simplified dashboard
    if (cluster.ID == "-"){
        var html_code = '\
<table class="dashboard_table">\
<tr>\
<td style="width:50%">\
<table style="width:100%">\
  <tr>\
    <td>\
      <div class="panel">\
<h3>' + tr("Cluster information") + '<i class="icon-refresh action_button" value="Host.refresh" style="float:right;cursor:pointer"></i></h3>\
        <div class="panel_info">\
\
          <table class="info_table">\
            <tr>\
              <td class="key_td">' + tr("ID") + '</td>\
              <td class="value_td">'+cluster.ID+'</td>\
            </tr>\
            <tr>\
              <td class="key_td">' + tr("Name") + '</td>\
              <td class="value_td">'+cluster.NAME+'</td>\
            </tr>\
            <tr>\
              <td class="key_td">' + tr("Hosts state") + '</td>\
              <td class="key_td">' + tr("Hosts CPU Usage") + '</td>\
            </tr>\
            <tr>\
              <td colspan="2"><div id="globalCpuUsage'+cluster.ID+'" style="float:left;width:50%;height:100px;"></div>\
                              <div id="statePie'+cluster.ID+'" style="float:right;width:50%;height:100px;"></div></td>\
            </tr>\
\
            <tr>\
              <td class="key_td">' + tr("Used vs. Max CPU") + '</td>\
              <td></td>\
            </tr>\
            <tr>\
              <td colspan="2">\
               <div id="cpuUsageBar'+cluster.ID+'" style="width:95%;height:50px"></div>\
              </td>\
            </tr>\
\
            <tr>\
              <td class="key_td">' + tr("Used vs. Max Memory") + '</td>\
              <td></td>\
            </tr>\
            <tr>\
              <td colspan="2">\
               <div id="memoryUsageBar'+cluster.ID+'" style="width:95%;height:50px"></div>\
              </td>\
            </tr>\
          </table>\
\
        </div>\
      </div>\
    </td>\
  </tr>\
</table>\
</td>\
<td style="width:50%">\
<table style="width:100%">\
  <tr>\
    <td>\
      <div class="panel">\
        <h3>' + tr("Hosts") + '</h3>\
        <div class="panel_info">\
<br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="action_button" href="#hosts_tab" value="Host.create_dialog">'+tr("Create new host")+'</a><br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="show_tab_button" filter_id="'+cluster.ID+'" href="#hosts_tab">'+tr("Manage unclustered hosts")+'</a><br /></p>\
\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div class="panel">\
        <h3>' + tr("Datastores") + '</h3>\
        <div class="panel_info">\
<br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="action_button" href="#datastores_tab" value="Datastore.create_dialog">'+tr("Create new datastore")+'</a><br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="show_tab_button" filter_id="'+cluster.ID+'" href="#datastores_tab">'+tr("Manage unclustered datastores")+'</a><br /></p>\
        </div>\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div class="panel">\
        <h3>' + tr("Virtual Networks") + '</h3>\
        <div class="panel_info">\
<br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="action_button" href="#vnets_tab" value="Network.create_dialog">'+tr("Create new virtual network")+'</a><br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="show_tab_button" filter_id="'+cluster.ID+'" href="#vnets_tab">'+tr("Manage unclustered virtual networks")+'</a><br /></p>\
        </div>\
      </div>\
    </td>\
  </tr>\
</table>\
</td>\
</tr></table>\
';
        return html_code;
    };

    //end cluster 'none' special html

    var html_code = '\
<table class="dashboard_table">\
<tr>\
<td style="width:50%">\
<table style="width:100%">\
  <tr>\
    <td>\
      <div class="panel">\
<h3>' + tr("Cluster information") + '<i class="icon-refresh action_button" value="Host.list" style="float:right;cursor:pointer"></i></h3>\
        <div class="panel_info">\
\
          <table class="info_table">\
            <tr>\
              <td class="key_td">' + tr("ID") + '</td>\
              <td class="value_td">'+cluster.ID+'</td>\
            </tr>\
            <tr>\
              <td class="key_td">' + tr("Name") + '</td>\
              <td class="value_td">'+cluster.NAME+'</td>\
            </tr>\
            <tr>\
              <td class="key_td">' + tr("Hosts state") + '</td>\
              <td class="key_td">' + tr("Hosts CPU Usage") + '</td>\
            </tr>\
            <tr>\
              <td colspan="2"><div id="globalCpuUsage'+cluster.ID+'" style="float:left;width:50%;height:100px;"></div>\
                              <div id="statePie'+cluster.ID+'" style="float:right;width:50%;height:100px;"></div></td>\
            </tr>\
\
            <tr>\
              <td class="key_td">' + tr("Used vs. Max CPU") + '</td>\
              <td><div class="cpuUsageBar_legend"></div></td>\
            </tr>\
            <tr>\
              <td colspan="2">\
               <div id="cpuUsageBar'+cluster.ID+'" style="width:95%;height:50px"></div>\
              </td>\
            </tr>\
\
            <tr>\
              <td class="key_td">' + tr("Used vs. Max Memory") + '</td>\
              <td><div class="memoryUsageBar_legend"></td>\
            </tr>\
            <tr>\
              <td colspan="2">\
               <div id="memoryUsageBar'+cluster.ID+'" style="width:95%;height:50px"></div>\
              </td>\
            </tr>\
          </table>\
\
        </div>\
      </div>\
    </td>\
  </tr>\
</table>\
</td>\
<td style="width:50%">\
<table style="width:100%">\
  <tr>\
    <td>\
      <div class="panel">\
        <h3>' + tr("Hosts") + '</h3>\
        <div class="panel_info">\
\
          <p><br />'+tr("Current number of hosts in this cluster")+': '+hosts_n+'.</p><p>\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="action_button" href="#hosts_tab" value="Host.create_dialog">'+tr("Create new host")+'</a><br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="show_tab_button" filter_id="'+cluster.ID+'" href="#hosts_tab">'+tr("Manage cluster hosts")+'</a><br /></p>\
\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div class="panel">\
        <h3>' + tr("Datastores") + '</h3>\
        <div class="panel_info">\
\
           <p><br />'+tr("Current number of datastores in this cluster")+': '+dss_n+'.</p><p>\
\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="action_button" href="#datastores_tab" value="Datastore.create_dialog">'+tr("Create new datastore")+'</a><br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="show_tab_button" filter_id="'+cluster.ID+'" href="#datastores_tab">'+tr("Manage cluster datastores")+'</a><br /></p>\
        </div>\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div class="panel">\
        <h3>' + tr("Virtual Networks") + '</h3>\
        <div class="panel_info">\
\
           <p><br />'+tr("Current number of virtual networks in this cluster")+': '+vnets_n+'.</p><p>\
\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="action_button" href="#vnets_tab" value="Network.create_dialog">'+tr("Create new virtual network")+'</a><br />\
          <span class="ui-icon ui-icon-arrowreturnthick-1-e inline-icon" /><a class="show_tab_button" filter_id="'+cluster.ID+'" href="#vnets_tab">'+tr("Manage cluster virtual networks")+'</a><br /></p>\
        </div>\
      </div>\
    </td>\
  </tr>\
</table>\
</td>\
</tr></table>\
';

    return html_code;
}