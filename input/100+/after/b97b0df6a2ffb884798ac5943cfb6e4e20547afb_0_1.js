function(){
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

            if( (status['members']>0) && !that.isOpen()){
                console.log("emit open, isopen true");
                that.emit('isopen', true);
                that.emit('open');
            }
            if( (status['members']==0) && that.isOpen()){
                console.log("emit closed, isopen false");
                that.emit('isopen', false);
                that.emit('closed');
            }

            that.lastStatus = status;
        }