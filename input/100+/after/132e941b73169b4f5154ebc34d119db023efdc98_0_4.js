function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if(/cas:authenticationSuccess/.exec(body)){
                    //console.log('auth passed ');
                    // stuff the cookie  into a session
                    // and store the ticket as well

                    // valid user
                    if(/<cas:user>(\w+)<\/cas:user>/.exec(body)){
                        req.session.name = RegExp.$1;
                    }
                    req.session.st = ticket;

                    // stuff into a redis session
                    redclient.set(ticket,req.sessionID);
                    next();
                    //res.writeHead(307,{'location':service});
                    //res.end();
                }else{
                    console.log('something else!' + body)
                    next('route')
                }

            }else{
                console.log('auth failed') ;
                // okay, not logged in, but don't get worked up about it
                next(new Error('authentication failed'));
            }
            return null;

        }