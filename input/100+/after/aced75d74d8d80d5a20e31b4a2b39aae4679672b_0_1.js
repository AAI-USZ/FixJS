function (name, key, socket) {
	var i = 0;
        var md5TestString=this.crypto.createHash('md5').update(key).digest("hex");
        var md5TestString_send=this.crypto.createHash('md5').update(md5TestString).digest("hex");
	for (i in GlobalthisThing.Presentations[name].adminCodes) {
            md5TestString=this.crypto.createHash('md5').update((' ' + GlobalthisThing.Presentations[name].adminCodes[i]).trim()).digest("hex");
            var md5TestString2=this.crypto.createHash('md5').update(md5TestString).digest("hex");
		if ( md5TestString2 === md5TestString_send) {
			GlobalthisThing.Presentations[name].admin = socket.id;
			GlobalthisThing.savePresData();
                            socket.emit('identAsAdmin', {
                            "name" : name,
                            'ident' : 'ADMIN'
                            });
                        GlobalthisThing.setAdminEvents(name,socket);
                        console.log(Server_settings.preTagServer + " Client " + socket.id + " ACCESS GRANTED");
			return true;
		}
	}
        try {
            //try to get an MD5(MD5(password)) from the Canonical URL
            var request = require(Server_settings.RequestPackage);
            request(name, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    //<meta name="password" content="65e769bcfba3cc2a78d7ea32c59b7e09">-->tester
                    var re2 = new RegExp(/<meta.name=["']password['"].+content=['"](.+)['"]>/i),
                    arrMatches2 = body.match(re2);	
                    if (arrMatches2) {
                        if(arrMatches2[1]==md5TestString_send)
                        {
                            GlobalthisThing.Presentations[name].admin = socket.id;
                            GlobalthisThing.savePresData();
                            socket.emit('identAsAdmin', {
                                "name" : name,
                                'ident' : 'ADMIN'
                                });
                            GlobalthisThing.setAdminEvents(name,socket);    
                            console.log(Server_settings.preTagServer + " Client " + socket.id + " ACCESS GRANTED");
                        } else {
                            socket.emit('identAsAdmin', {
                                "name" : name,
                                'ident' : 'USER'
                                });
                            console.log(Server_settings.preTagServer + " Client  " + socket.id + ' ACCESS DENIED');
                        }
                    } else {
                        socket.emit('identAsAdmin', {
                            "name" : name,
                            'ident' : 'USER'
                            });
                        console.log(Server_settings.preTagServer + " Client  " + socket.id + ' ACCESS DENIED');
                    }
                }
                    
            });
        } catch (err) { 
            socket.emit('identAsAdmin', {
                "name" : name,
                'ident' : 'USER'
                });
            console.log(Server_settings.preTagServer + " Client  " + socket.id + ' ACCESS DENIED');
            
            console.log(err); }
}