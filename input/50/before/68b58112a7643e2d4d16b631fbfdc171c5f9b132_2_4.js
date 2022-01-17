function onPicSuccess(imageData) {
    ManageUserSession.getApiClient().addAttachment('ContactViewer-UserPhoto', listView.selectedContactId, imageData);
    StorageManager.setLocalValue(listView.selectedContactId + '__pic', imageData);
    showContactPicture(listView.selectedContactId);
}