function(req,res,next){
        console.log('processing session or abort');
        if(req.session !== undefined  && req.session.st){
            console.log('have session.  steady as she goes');
            // okay, pass control
            return next();
        }else{
            console.log('no session, switch to next route');
            return next('route');//new Error('unauthorized'));
        }
    }