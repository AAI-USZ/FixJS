function newClusterMenuElement(element){
    var cluster = element.CLUSTER;
    var menu_name = cluster.NAME.length > 10 ?
        cluster.NAME.substring(0,9)+'...' : cluster.NAME;

    var menu_cluster = {
        title: menu_name + ' (id ' + cluster.ID + ')',
        content: clusterTabContent(element),
        tabClass: 'subTab subsubTab',
        parentTab: 'clusters_tab'
//        buttons: null
    };
/*
    var submenu_hosts = {
        title: tr("Hosts"),
        content: '',
        tabClass: "subTab clusterHosts subsubTab",
        parentTab: "cluster_tab_" + cluster.ID
    };

    var submenu_datastores = {
        title: tr("Datastores"),
        content: '',
        tabClass: "subTab clusterDatastores subsubTab",
        parentTab: "cluster_tab_" + cluster.ID
    };

    var submenu_vnets = {
        title: tr("Virtual Networks"),
        content: '',
        tabClass: "subTab clusterVnets subsubTab",
        parentTab: "cluster_tab_" + cluster.ID
    };
*/
    Sunstone.addMainTab('cluster_tab_'+cluster.ID,menu_cluster,true);

//    Sunstone.addMainTab('cluster_hosts_tab_'+cluster.ID,submenu_hosts,true);
//    Sunstone.addMainTab('cluster_datastores_tab_'+cluster.ID,submenu_datastores,true);
//    Sunstone.addMainTab('cluster_vnets_tab_'+cluster.ID,submenu_vnets,true);
}