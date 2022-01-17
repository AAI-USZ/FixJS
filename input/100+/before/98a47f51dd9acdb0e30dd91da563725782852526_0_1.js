function(guid,token) {
        console.log(this.timestamp()+" Taking a picture");
        var getOptions = {
            host:'localhost',
            port:5000,
            path:'/?action=snapshot',
            method:'GET'
        };
        var postOptions = {
            host:this.config.cloudStream,
            port:this.config.cloudStreamPort,
            path:'/rest/v0/camera/'+guid+'/snapshot',
            method:'POST',
        };
        proto = (this.config.cloudStreamPort==443) ? require('https') : require('http')
        var getReq = http.get(getOptions,function(getRes) {
            postOptions.headers = getRes.headers;   
            postOptions.headers['X-Ninja-Token'] = token;
            var postReq = proto.request(postOptions,function(postRes) {
                postRes.on('end',function() {
                    console.log(this.timestamp()+' Stream Server ended');
                });
            });
            postReq.on('error',function(err) {
                console.log(this.timestamp()+' Error sending picture: ');
                console.log(err);
            });
            getRes.on('data',function(data) {
                postReq.write(data,'binary');
            });
            getRes.on('end',function() {
                postReq.end();
                console.log(this.timestamp()+" Image sent");
            });
        });
        getReq.on('error',function(error) {
            console.log(this.timestamp()+" "+error);
        });
        getReq.end();
    }