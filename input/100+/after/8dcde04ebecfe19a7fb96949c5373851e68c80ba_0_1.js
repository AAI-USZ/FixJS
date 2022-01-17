function(channel, msg) {
    var args;
    if(channel == "newfeed") {
        //feed, instance
        args = msg.split('\x00');
        this.emit('create', args[0]);
    } else if (channel == "delfeed") {
        //feed instance
        args = msg.split('\x00');
        this.emit('delete', args[0]);
    } else if (channel == "conffeed") {
        //feed instance
        args = msg.split('\x00');
        this.emit('config:' + args[0]);
    } else if (channel.substring(0, 13) == 'feed.publish:') {
        //id, event
        args = msg.split('\x00');

        //chans[1] is the feed name
        var chans = channel.split(":");

        //publish: id, payload
        this.emit('publish:' + chans[1], chans[1], args[0], args[1]);
        this.emit('publish.id:' + chans[1] + ':' + args[0], chans[1], args[0], args[1]);
    } else if (channel.substring(0,11) == 'job.finish:') {
        var chans = channel.split(":");
        args = msg.split('\x00');
        this.emit('job.finish:' + chans[1], chans[1], args[0], args[1]);
    } else if (channel.substring(0, 10) == 'feed.edit:') {
        //id, event
        args = msg.split('\x00');

        //chans[1] is the feed name
        var chans = channel.split(":");

        //publish: id, payload
        this.emit('edit:' + chans[1], chans[1], args[0], args[1]);
        this.emit('edit.id:' + chans[1] + ':' + args[0], chans[1], args[0], args[1]);
    } else if (channel.substring(0, 13) == 'feed.retract:') {
        //retract: id
        var chans = channel.split(":");
        this.emit('retract:' + chans[1], chans[1], msg);
        this.emit('retract.id:' + chans[1] + ':' + msg, chans[1], msg);
    } else if (channel.substring(0, 14) == 'feed.position:') {
        var chans = channel.split(":");
        args = msg.split('\x00');
        this.emit('position:' + chans[1], chans[1], args[0], args[1]);
        this.emit('position.id:' + chans[1] + ':' + args[0], chans[1], args[0], args[1]);
    }
}