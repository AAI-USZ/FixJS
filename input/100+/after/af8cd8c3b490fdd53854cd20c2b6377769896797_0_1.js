function( separator ) {

    if(!( this.raw )) {
        return null;
    }
    
    separator = separator || '=';
    var data = this.raw;
    
    try {
        // Crop the body.
        idx = data.indexOf('\n\n');
        if( idx > -1 ) {
            this.body = data.substr(idx + 2);
            data = data.substr( 0, idx );
        }
        
        cmdline = null;
        idx = data.indexOf('\n');
        sidx = data.indexOf( separator );
        
        if( idx > -1 && ( sidx == -1 || sidx > idx ) ) {
            cmdline = data.substr( 0, idx );
            data = data.substr( idx + 1 );
        } else if( sidx == -1 ) {
            cmdline = data;
            data = '';
        }
        
        if( cmdline ) {
            seg = cmdline.split(' ');
            this.cmd = seg[0];
            this.param = seg[1] ? seg[1] : null;
        }
        
        this.arg = this.parseArgs(data, separator);
        
    } catch(e) {
        alert('parser exception:' + e);
        this.setNull();
    }

}