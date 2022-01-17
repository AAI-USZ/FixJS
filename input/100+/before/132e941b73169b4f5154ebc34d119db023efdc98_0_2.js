function(req,res,next){
        //  redirect to CAS server
        var url = parseUrl(req.url,true);
        var service = opt_service ? opt_service :
            'http://'+req.headers.host + url.pathname;
        var queryopts = {'service':service};
        if(gateway){
            queryopts.gateway = gateway;
        }
        console.log('no current session, redirecting to CAS server') ;
        // previous version had an if here, with a 403 if request was
        // a json, but that never worked anyway

        res.writeHead(307, { 'location': 'https://'+cas_host+login_service
                              +'?'
                              +querystring.stringify(queryopts)
                           });
        return res.end();
    }