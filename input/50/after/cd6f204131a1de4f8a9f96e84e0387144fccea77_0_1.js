function onCreatedFriendList(data) {
    list_id = data['friendlist_id'];
    window.open('https://www.facebook.com/lists/' + list_id);
}