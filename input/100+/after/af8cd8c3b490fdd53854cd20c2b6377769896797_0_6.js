function( data, limit, sep, end ) {
    sep = sep || '\t';
    end = end || '&';
    tokens = [];
    
    for( i = limit; i > 0; i-- ) {
        find = data.indexOf(sep);
        
        if( find == -1 )
            break;
        
        tokens.push( data.substring(0, find) );
        data = data.substring(find + 1);
        
        if( tokens[tokens.length - 1] == end ) {
            tokens.pop();
            break;
        }
    }
    
    return [tokens, data];
}