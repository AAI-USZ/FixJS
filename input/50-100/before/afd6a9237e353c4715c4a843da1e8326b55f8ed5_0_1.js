function playMovie(building) {
    window.plugins.videoPlayer.play('http://tali.irail.be/REST/Movie/qrID/' + building.token + '.gp3');  
}