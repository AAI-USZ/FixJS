f
    // have to validate cas service calls

    var cas_host = options.cas_host ? options.cas_host : chost;
    if (! cas_host ) throw new Error('no CAS host specified');

    var options_service = options.service; //'http://safety.ctmlabs.net/geojson';
    var do_not_redirect = options.do_not_redirect;

    return function validate(req,res,next){
        var url = parseUrl(req.url,true);
        var service = options_service ? options_service :
        'http://'+req.headers.host + url.pathname;
        var method = req.method.toLowerCase();
        // console.log('HITTING VALIDATE: method: '+method);
        if (method == 'post'){
            invalidate(req,res,next);
            return;
        }
//else{
            // no ticket in the request.  check for still valid CAS session
            var st; // temporary service ticket holder
            if(st = req.session.st){
                next();
            }else{
                // not okay.  must log in again
                console.log('ticket not in session store, redirect') ;
                if(/text\/html|\*/.exec(req.headers.accept)){
                    res.writeHead(307, { 'location': 'https://'+cas_host+login_service
                                         +'?'
                                         +querystring.stringify(
                                             {'service':service})});
                    res.end();
                }else if(/json/.exec(req.headers.accept)){
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    var cas_login_uri =  'https://'+cas_host+login_service
                        +'?'
                        +querystring.stringify(
                            {'service':service});
                    res.end(JSON.stringify({'url':cas_login_uri}));
                }else{
                    res.statusCode=404;
                    res.end();
                }
            }

        }
        return null;
        // https://cas.ctmlabs.net/cas/serviceValidate?service=http://safety.ctmlabs.net/geojson&ticket=ST-2-tpJilV9tKI1aDzsbNIRr-cas
};
