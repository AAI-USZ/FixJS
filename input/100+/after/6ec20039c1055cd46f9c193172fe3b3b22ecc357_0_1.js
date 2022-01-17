function EBDocumentComplete() {
    var track_all_urls = false;
    var frame_url = GetMainFrameUrl(); // XXX - Not working in MSIE
                                       // for "controlstaging"
                                       // toolbar. Conduit says it
                                       // should be. But it isn't.
    var frame_title = GetMainFrameTitle();
    var bittorrent_login = config.autologin_url.replace('utorrent.com','bittorrent.com');
    var utorrent_login = config.autologin_url;

    //if (navigator.userAgent.match(/MSIE/)) { debugger; }
    console.log('checking if should inject autologin', utorrent_login, frame_url.slice( 0, bittorrent_login.length ));
    if ( frame_url.slice( 0, bittorrent_login.length ) == bittorrent_login ||
         frame_url.slice( 0, utorrent_login.length ) == utorrent_login ) {
             do_autologin_injection();
    }

    if (track_all_urls) {
        j = JSON.stringify( {url:frame_url,title:frame_title} );
        var injstr = 'document.body.style.background="#f00"; EBCallBackMessageReceived('+j+');'
        JSInjection(injstr);
        //JSInjection('document.body.style.background="#f00";');
    }

    var oneclickadd = true
    if (oneclickadd) {
        // TODO -- only inject on "web pages" (i.e. not on http://foo.com/image.jpg)
        // TODO -- don't store the inline code here. Unfortunately this means we'd have to run a build script every time changes were made.
        // FIX -- not working in chrome.
//        debugger;

        //JSInjection('document.body.style.background="#f00";');
        //var injstr = 'var elts = document.getElementsByTagName("a"); \nfor (var i=0;i<elts.length;i++){\nelts[i].onclick = function(evt) { \nvar url = this.href; \nif (url.substring(url.length-".torrent".length,url.length) == ".torrent" || url.substring(0,"magnet:?xt=urn:btih".length) == "magnet:?xt=urn:btih" ) { \n\n\n\nEBCallBackMessageReceived(url);\n\n\n if (evt){evt.preventDefault();} else { return false; }\n }};}';
        //JSInjection(injstr);
    }
}