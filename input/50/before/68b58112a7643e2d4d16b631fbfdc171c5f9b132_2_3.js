function saveUserPic() {
    navigator.camera.getPicture(onPicSuccess, onPicFail, { quality: 50 }); 
}