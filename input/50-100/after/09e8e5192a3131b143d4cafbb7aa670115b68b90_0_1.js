function(){
    mpd = new mpdSocket(mpd_host, mpd_port);
    mpd.on('close', function(){
        mpdInit();
    });
    mpd.on('error', function(){
        setTimeout(mpdInit, 10000);
    });
}