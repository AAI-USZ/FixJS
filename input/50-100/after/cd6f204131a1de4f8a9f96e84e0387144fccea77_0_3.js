function createFriendListNew(name, members) {
    $.ajax({
        'type' : 'POST',
        'url' : '/generatefriendlist/',
        'dataType' : 'JSON',
        'data' : {
            'name' : name,
            'members' : JSON.stringify(members)
        },
        'success' : onCreatedFriendList,
        'error' : createFriendListError
    });
}