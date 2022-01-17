function ( e ) {
            if ( !me.isDisabled() ) {
                if (false === me.onclick()) {
                    baidu.event.stop(e || window.event);
                }
            }
        }