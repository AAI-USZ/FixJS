function createFriendList() {
    var id = current_cluster_id;
    var name = $('#cluster-name').val();
    var data = new Array();
    data['name'] = name;
    data['members'] = clusters[id].members;

    $.ajax({
        'type' : 'POST',
        'url' : '/generatefriendlist/',
	'dataType' : 'JSON',
	'data' : {
	    'name' : name,
	    'members' : JSON.stringify(clusters[id].members)
	},
	'success' : onCreatedFriendList,
	'error' : createFriendListError
    });
}