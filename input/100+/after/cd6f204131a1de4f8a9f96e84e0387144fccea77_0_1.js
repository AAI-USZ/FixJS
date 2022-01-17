function showClustersOld(clusters) {
    var cluster_template = '<div class="cluster"><div class="cluster-info"><div class="cluster-title title"><span class="cluster-bullet">&bull;</span><span class="cluster-bullet">&bull;</span><span class="cluster-bullet">&bull;</span>Cluster ${i}<span class="cluster-bullet">&bull;</span><span class="cluster-bullet">&bull;</span><span class="cluster-bullet">&bull;</span></div></div><ul class="list-of-friends" id="cluster_${i}"></ul></div>'
    + '<p class="button"><a class="btn btn-large" id="viewcluster-button-${i}">Expand Cluster</a></p>';

    cluster_member_template = '<li><div class="friend-picture"><img src="http://graph.facebook.com/${i}/picture?type=large" width="80" class="picx80"></div><div class="friend-name">${name}</div></li>';

    for (var i=0; i<clusters.length; i++) {
        $.tmpl(cluster_template, {'alpha': parseInt(clusters[i].alpha*100), 'beta': parseInt(clusters[i].beta*100), 'i': parseInt(i+1)}).appendTo("#clusterDiv");
	var obj = { cluster_id: i };
	$("#viewcluster-button-" + (i+1)).click(viewCluster);
    }

   for (var i=0; i<clusters.length; i++) {
        var cluster_size = clusters[i].members.length;
	if (cluster_size > 10) cluster_size = 10;
        for (var j=0; j<cluster_size; j++) {
	    $.tmpl(cluster_member_template, {'i': clusters[i].members[j].i, 'name': clusters[i].members[j].name}).appendTo("#cluster_" + parseInt(i+1));
	}
    }
}