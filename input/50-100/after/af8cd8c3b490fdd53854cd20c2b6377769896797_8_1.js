function ( data, separator ) {    
    separator = separator || '=';
    args = {};
    lines = data.split('\n');
    for( n in lines ) {
        line = lines[n];
        si = line.search(separator);
        
        if( si == -1 )
            continue;
        
        args[line.substr( 0, si )] = line.substr( si + separator.length ) || '';
    }
    
    return args;
}