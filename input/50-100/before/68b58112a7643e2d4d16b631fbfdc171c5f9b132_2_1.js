function showContactPicture(contactId) {
    var existingPic = StorageManager.getLocalValue(contactId + '__pic');
    if (existingPic) {
        existingPic = "data:image/jpeg;base64," + existingPic;
    } else {
        existingPic = staticRsrcUrl + '/images/userPicwBorder.png';
    }
    $j('#photo_div img').attr('src', existingPic);
}