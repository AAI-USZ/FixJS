function init() {
            /**
             * @inner
             */
            function changeListener() {
                var loc = getLocation();
                if ( loc !== currentLocation ) {
                    locator_.redirect( loc );
                }
            }
            
            if ( baidu.ie && baidu.ie < 8 ) {
                ieIframeRecorderInit();
                ieInputRecorderInit();
            }
            
            setInterval( changeListener, 100 );
        }