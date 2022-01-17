function( str ) {
        //Decode unicode code points from utf8 encoded string
        var codePoints = [],
            i = 0, byte;

        while( !isNaN( byte = str.charCodeAt(i++) ) ) {
            if( (byte & 0xF8) === 0xF0 ) {
                codePoints.push(
                    ((byte & 0x7) << 18) |
                    ((str.charCodeAt(i++) & 0x3F) << 12) |
                    ((str.charCodeAt(i++) & 0x3F) << 6) |
                    (str.charCodeAt(i++) & 0x3F)
                );
            }
            else if( (byte & 0xF0) === 0xE0 ) {
                codePoints.push(
                    ((byte & 0xF) << 12) |
                    ((str.charCodeAt(i++) & 0x3F) << 6 ) |
                    (str.charCodeAt(i++) & 0x3F)
                );
            }
            else if( (byte & 0xE0) === 0xC0 ) {
                codePoints.push(
                    ((byte & 0x1F) << 6) |
                    ( (str.charCodeAt(i++) & 0x3F) )
                );
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