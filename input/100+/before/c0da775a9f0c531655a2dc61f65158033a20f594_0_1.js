function popupModal(url, name, windowWidth, windowHeight, opts) {

    if(name == undefined)name = 'nWindow';
    if(opts == undefined)opts = '';

    if(!windowWidth)windowWidth = 1100;
    if(!windowHeight)windowHeight = 850;

    myleft = (screen.width - windowWidth) / 2;
    mytop = (screen.height - windowHeight) / 2;

    // myleft = window.screenLeft ? window.screenLeft : window.screenX;
    // mytop = window.screenTop ? window.screenTop : window.screenY;

    // properties = "dialogWidth:"+windowWidth+"; dialogHeight:"+windowHeight+"; status:yes; resizable:yes; scroll:yes; dialogTop:"+mytop+"; dialogLeft:"+myleft;
    properties = "width="+windowWidth+",height="+windowHeight+",status=1,resizable=1,scrollbars=1,top="+mytop+",left="+myleft;

    if(!empty(opts))
        properties += ', '+opts;
    properties = str_replace(' ', '', properties);

    // add dynamic popup parameter
    if(url.indexOf('http') == -1 && url.indexOf('ftp') == -1  &&  url.indexOf('mailto') == -1 &&  url.indexOf('&popup=1') == -1 && url.indexOf('?') >= 0)
        url += '&popup=1';


    // newwindow = window.showModalDialog(url, name, properties);
    newwindow = window.open(url, name, properties);
    newwindow.resizeTo(windowWidth, windowHeight);
    newwindow.moveTo(myleft, mytop);
    newwindow.focus();
}