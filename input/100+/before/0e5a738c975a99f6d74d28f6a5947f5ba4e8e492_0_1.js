function redirect( loc, opt_option ) {
        var opt = opt_option || {};

        // 非string不做处理
        if ( typeof loc != 'string' ) {
            return;
        }
       
        // 增加location带起始#号的容错性
        // 可能有人直接读取location.hash，经过string处理后直接传入
        loc = loc.replace( /^#/, '' );

        // 空string当成DEFAULT_INDEX处理
        if ( loc.length == 0 ) {
            loc = er._util.getConfig( 'DEFAULT_INDEX' ); 
        }

        // 与当前location相同时不进行route
        var isLocChanged = updateLocation( loc );
        if ( isLocChanged || opt.enforce ) {
            loc = currentLocation;

            // 触发onredirect事件
            er.locator.onredirect();
            
            // 当location未变化，强制刷新时，直接route
            if ( !isLocChanged ) {
                er.router( loc );
            } else {
                doRoute( loc );
            }
        }
    }