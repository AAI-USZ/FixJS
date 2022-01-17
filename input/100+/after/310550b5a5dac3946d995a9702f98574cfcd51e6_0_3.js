function getVariableValue( scope, varName, opt_filterName ) {
        var typeRule = /:([a-z]+)$/i;
        var match    = varName.match( typeRule );
        var value    = '';
        var i, len;
        var variable, propName, propLen;

        varName = varName.replace( typeRule, '' );
        if ( match && match.length > 1 ) {
            value = getVariableValueByType( varName, match[1] );
        } else {
            varName  = varName.split( /[\.\[]/ );
            variable = scope.get( varName[ 0 ] );
            varName.shift();

            for ( i = 0, len = varName.length; i < len; i++ ) {
                if ( !er._util.hasValue( variable ) ) {
                    break;
                }

                propName = varName[ i ].replace( /\]$/, '' );
                propLen  = propName.length;
                if ( /^(['"])/.test( propName ) 
                     && propName.lastIndexOf( RegExp.$1 ) == --propLen
                ) {
                    propName = propName.slice( 1, propLen );
                }

                variable = variable[ propName ];
            }

            if ( er._util.hasValue( variable ) ) {
                value = variable;
            }
        }
        
        // 过滤处理
        if ( opt_filterName ) {
            opt_filterName = filterContainer[ opt_filterName.substr( 1 ) ];
            opt_filterName && ( value = opt_filterName( value ) );
        }

        return value;
    }