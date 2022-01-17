function(res) {
        var resString = '';

        res.setEncoding('utf8');

        res.on( 'data', function( data ) {
            resString += data;
        } );

        res.on('end', function(){
            var status;
            try {
                status = JSON.parse(resString);
            }
            catch( e ) {
                console.log( 'json parsing error: ' + e.message );
                return;
            }

            if(!that.lastStatus){
                that.lastStatus = status;
                that.emit('ready', that.isOpen());
                return;
            }
            if(status['members'] != that.lastStatus['members']){
                that.emit('membercount', status['members']);
                console.log("emit membercount" + status['members']);
            }
            if( (status['members']>0) != that.isOpen()){
                that.emit('isopen', that.isOpen());
                if(status['members'] && !that.isOpen()){
                    that.emit('open');
                    console.log("emit open");
                }
                if(!status['members'] && that.isOpen()){
                    that.emit('closed');
                    console.log("emit closed");
                }
            }
            that.lastStatus = status;
        });
    }