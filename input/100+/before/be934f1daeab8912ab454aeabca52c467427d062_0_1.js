function() {
        if (nodedetails.token) {
            socket.emit('iam',nodedetails.token);
        } else {
            console.log('Awaiting Activation');
            sutil.changeLEDColor(tty,'purple');
            socket.emit('notsure');
            socket.on('youare',function(token) {
                console.log("Received Authorisation")
                fs.writeFileSync(config.tokenFile, token.token, 'utf8');
                nodedetails["token"] = token.token;
                socket.emit('iam',token.token);
            });
        }
    }