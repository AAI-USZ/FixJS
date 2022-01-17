function createFriendListError(data) {
    id = data['cluster_id'];
    clearSavingFriendList(id);
    displayError("Could not create friend list");
}