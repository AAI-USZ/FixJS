function wsc_packetstr( cmd, param, args, body ) {
    var ret = '';
    if(cmd) {
        ret = cmd
        if(param) {
            ret = ret + " " + param;
        }
    }
    if(args) {
        for(var key in args) {
            ret = ret + "\n" + key + "=" + args[key];
        }
    }
    ret = ret + "\n";
    if(body) {
        ret = ret + "\n" + body;
    }
    return ret;
}