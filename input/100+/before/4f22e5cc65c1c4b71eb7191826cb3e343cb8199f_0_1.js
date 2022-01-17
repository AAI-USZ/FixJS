function exec( target, scope ) {
        var result = [];
        var block = target.block;
        
        var stat, i, len;
        var forScope, forList, forI, forLen, forItem, forIndex;
        var ifValid;

        
        for ( i = 0, len = block.length; i < len; i++ ) {
            stat = block[ i ];

            switch ( stat.type ) {
            case TYPE.TEXT:
                result.push( replaceVariable( stat.text, scope ) ) ;
                break;

            case TYPE.IMPORT:
                execImport( stat );
                break;

            case TYPE.FOR:
                forScope = new Scope( scope );
                forList  = scope.get( stat.list );
                forItem  = stat.item;
                forIndex = stat.index;
                for ( forI = 0, forLen = forList.length; forI < forLen; forI++ ) {
                    forScope.set( forItem, forList[ forI ] );
                    forIndex && forScope.set( forIndex, forI );
                    result.push( exec( stat, forScope ) );
                }
                break;

            case TYPE.IF:
                ifValid = condExpr.exec( stat.expr, scope );
                while ( !ifValid ) {
                    stat = stat[ 'else' ];
                    if ( !stat ) {
                        break;
                    }
                    ifValid = !stat.expr || condExpr.exec( stat.expr, scope );
                }

                stat && result.push( exec( stat, scope ) );
                break;
            }
        }

        return result.join( '' );
    }