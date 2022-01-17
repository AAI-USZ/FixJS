function(data){
            var status = JSON.parse(data);
            if(!that.lastStatus){
                that.lastStatus = status;
                return;
            }
            if(status['members'] != that.lastStatus['members']){
                that.emit('membercount', status['members']);
            }
            if( (!status['members']) != !isOpen()){
                that.emit('isopen', !isOpen());
                if(status['members'] && !isOpen()){
                    that.emit('open');
                }
                if(!status['members'] && isOpen()){
                    that.emit('closed');
                }
            }
            that.lastStatus = status;
        }