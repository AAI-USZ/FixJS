function updateLocation( loc ) {
            var locResult   = parseLocation( loc ),
                path        = locResult.path,
                query       = locResult.query,
                historyList,
                historyInput,
                isOldLoc,
                i, 
                len;
            
            if ( baidu.ie && baidu.ie < 8 ) {
                location.hash = loc;
                
                historyInput = baidu.g( getConfig( 'CONTROL_INPUT_ID' ) );
                if ( historyInput ) {
                    if ( !/(~|&)_ietag=([a-z0-9]+)(&|$)/.test( loc ) ) {
                        if ( loc.indexOf('~') > 0 ) {
                            loc += '&';
                        } else {
                            loc += '~';
                        }
                        
                        loc += '_ietag=' + random();
                    }

                    historyList = baidu.json.parse( historyInput.value );

                    for ( i = 0, len = historyList.length; i < len; i++ ) {
                        if ( historyList[ i ].loc == loc ) {
                            isOldLoc = i;
                            break;
                        }
                    }

                    if ( typeof isOldLoc != 'number' ) {
                        historyList.push({
                            path:path, 
                            query:query, 
                            loc:loc
                        });
                    } else {
                        randomMap_[ RegExp.$2 ] = 1;
                    }

                    historyInput.value = baidu.json.stringify( historyList );
                }
            }
            
            // 存储当前信息
            currentPath = path;
            currentQuery = query;
            currentLocation = loc;

            return true;
        }