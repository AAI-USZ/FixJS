function( str ) {
        //Decode unicode code points from utf8 encoded string
        var codePoints = [],
            i = 0, byte, codePoint;

        while( !isNaN( byte = str.charCodeAt(i++) ) ) {
            if( (byte & 0xF8) === 0xF0 ) {
                codePoint = ((byte & 0x7) << 18) |
                            ((str.charCodeAt(i++) & 0x3F) << 12) |
                            ((str.charCodeAt(i++) & 0x3F) << 6) |
                            (str.charCodeAt(i++) & 0x3F);
                            
                if( !( 0xFFFF < codePoint && codePoint <= 0x1FFFFF ) ) {
                    codePoint = 0xFFFD;
                }
                codePoints.push(codePoint);
            }
            else if( (byte & 0xF0) === 0xE0 ) {
                codePoint = ((byte & 0xF) << 12) |
                        ((str.charCodeAt(i++) & 0x3F) << 6 ) |
                        (str.charCodeAt(i++) & 0x3F);
                if( !( 0x7FF < codePoint && codePoint <= 0xFFFF ) ) {
                    codePoint = 0xFFFD;
                }
                codePoints.push(codePoint);
            }
            else if( (byte & 0xE0) === 0xC0 ) {
                codePoint = ((byte & 0x1F) << 6) |
                            ( (str.charCodeAt(i++) & 0x3F) );
                if( !( 0x7F < codePoint && codePoint <= 0x7FF ) ) {
                    codePoint = 0xFFFD;
                }
                codePoints.push(codePoint);
            }
            else if( (byte & 0x80) === 0x00 ) {
                codePoints.push( byte & 0x7F );
            }
            else {
                codePoints.push( 0xFFFD );
            }

        }    
        return unicode.from.apply( String, codePoints );
    }