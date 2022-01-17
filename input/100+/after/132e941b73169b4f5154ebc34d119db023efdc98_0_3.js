function invalidate(req,res,next){
    // handling a post here

    // parse out the ticket number from the body, then get the
    // sessionid associated with that ticket, and destroy it.
    //console.log('handling ssoff')
    for( var param in req.body){
        if(/<samlp:SessionIndex>(.*)<\/samlp:SessionIndex>/.exec(req.body[param])){
            var st = RegExp.$1;
            redclient.get(st,function(err,sid){
                if(!err){
                    req.sessionStore.destroy(sid,function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                    redclient.del(st);
                }
            });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end();
            return null;
        }
    }
    next(new Error('Unauthorized'));
    return null;
}