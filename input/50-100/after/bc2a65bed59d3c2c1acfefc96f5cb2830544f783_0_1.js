function(){
    console.log("mpd (re) connect");
    mpd = new mpdSocket(mpd_host, mpd_port);
    mpd.on('close', function(){
        console.log("mpd socket closed.");
        mpdInit();
    });
    mpd.on('error', function(){
        console.log("mpd socket error");
        setTimeout(mpdInit, 10000);
    });
}