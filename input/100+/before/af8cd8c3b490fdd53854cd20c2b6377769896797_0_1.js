function wsc_packet( data ) {
    if(!data) {
        return null;
    }

    try {
        var cmd;
        //We need param to be null so it will fail the if test.
        //This is to make the serializer work properly.
        var param;
        //var param = '';

        var idx = data.search('\n');
        if(idx == 0) {
            return null;
        }
        var headerline = data.substr(0, idx).replace(/\s*$/, '');
        cmd = headerline.match(/\S+/)[0];
        var sidx = headerline.search(' ');
        if(sidx && sidx > 0)
            param = headerline.substr(sidx+1).match(/\S.*/)[0].replace(/\s*$/, '');
        var args = wsc_packet_args(data.substr(idx + 1));

        return {
            'cmd' : cmd,
            'param' : param,
            'arg' : args.args,
            'body' : args.data,
            'serialize': function( ) { return wsc_packetstr(this.cmd, this.param, this.arg, this.body); }
        };
    } catch(e) {
        alert('parser exception:' + e);
        return null;
    }
}