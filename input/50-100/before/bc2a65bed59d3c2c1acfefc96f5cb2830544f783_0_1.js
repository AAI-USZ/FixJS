function(){
    mpd = new mpdSocket(mpd_host, mpd_port);
    mpd.on('close', function(){
        console.log("mpd socket closed. reconnecting");
        mpdInit();
    });
}