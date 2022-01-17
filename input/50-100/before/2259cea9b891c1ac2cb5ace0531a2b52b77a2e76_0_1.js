function init() {
            // 初始化默认的index
            if ( !getLocation() ) {
                location.hash = getConfig( 'DEFAULT_INDEX' );
            }

            /**
             * @private
             */
            function changeListener() {
                var loc = getLocation();
                if ( loc != currentLocation ) {
                    locator_.redirect(loc);
                }
            }
            
            if ( baidu.ie ) {
                ieIframeRecorderInit();
                ieInputRecorderInit();
            }
            
            setInterval( changeListener, 100 );
        }