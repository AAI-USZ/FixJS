function(initCb, display, options)
{
    if (!options)
        options = false;

    if (!display)
       display = process.env.DISPLAY;
    if (!display)
        display = ':0';

    var displayMatch = display.match(/^(?:[^:]*?\/)?(.*):(\d+)(?:.(\d+))?$/);
    if (!displayMatch)
       throw new Error("Cannot parse display");

    var host = displayMatch[1];
    if (!host)
        host = '127.0.0.1';

    var displayNum = displayMatch[2];
    if (!displayNum)
        displayNum = 0;
    var screenNum = displayMatch[3];
    if (!screenNum)
        screenNum = 0;
    
    // open stream
    var stream;
    var socketPath;

    // try local socket on non-windows platforms
    if ( ['cygwin', 'win32', 'win64'].indexOf(process.platform) < 0 )
    {
        if (process.platform == 'darwin' || process.platform == 'mac')
        {
            // socket path on OSX is /tmp/launch-(some id)/org.x:0
            if (display[0] == '/') 
            {
                socketPath = display;
            }           
        } else if(host == '127.0.0.1') //TODO check if it's consistent with xlib (DISPLAY=127.0.0.1:0 -> local unix socket or port 6000?)
            socketPath = '/tmp/.X11-unix/X' + displayNum;
    } 
    //socketPath = '/tmp/.X11-unix/X' + displayNum;
    if(socketPath)
    {
    	stream = net.createConnection(socketPath);
    }
    else
    {
    	stream = net.createConnection(6000 + parseInt(displayNum), host);
    }
    var client = new XClient(stream, displayNum, screenNum, options);
    if (initCb)
    {
        client.on('connect', function(display) {
            // opt-in BigReq
            if (!options.disableBigRequests) {
                client.require('big-requests', function(BigReq) {
                    BigReq.Enable(function(err, maxLen) {
                        display.max_request_length = maxLen;
                        initCb(display);
                    });
                });
            } else {
                initCb(display);
            }
        });
    } 
    return client;     
}