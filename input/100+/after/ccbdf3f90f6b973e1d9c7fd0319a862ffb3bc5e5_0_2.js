function(){
    console.log("update status");

    var options = {
        host: 'status.bckspc.de',
        port: 80,
        path: '/status.php?response=json'
    };
    var that=this;
    http.get(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data){
            var status = JSON.parse(data);
            if(!that.lastStatus){
                that.lastStatus = status;
                return;
            }
            if(status['members'] != that.lastStatus['members']){
                that.emit('membercount', status['members']);
            }
            if( (!status['members']) != !that.isOpen()){
                that.emit('isopen', !that.isOpen());
                if(status['members'] && !that.isOpen()){
                    that.emit('open');
                }
                if(!status['members'] && that.isOpen()){
                    that.emit('closed');
                }
            }
            that.lastStatus = status;
        });
    }).on('error', function(e) {
        console.log("Got http status error error: " + e.message);
    });
    setTimeout(function(){
        that.updateSpaceStatus();
    }, this.fetchTimer);
}