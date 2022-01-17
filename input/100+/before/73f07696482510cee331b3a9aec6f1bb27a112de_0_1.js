function(data){
            var status = JSON.parse(data);
            if(!that.lastStatus){
                that.lastStatus = status;
                that.emit('ready', that.isOpen());
                return;
            }
            if(status['members'] != that.lastStatus['members']){
                that.emit('membercount', status['members']);
            }
            if( (!status['members']) != !that.isOpen()){
                that.emit('isopen', that.isOpen());
                if(status['members'] && !that.isOpen()){
                    that.emit('open');
                }
                if(!status['members'] && that.isOpen()){
                    that.emit('closed');
                }
            }
            that.lastStatus = status;
        }