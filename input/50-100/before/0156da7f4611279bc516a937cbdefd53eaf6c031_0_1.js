function() {
        $submenu = $( this ).children( 'ul.sub-menu' );
        
        if ( !$submenu.is( ':visible' ) ) {
            $submenu.fadeIn( 75, function() {
                $( document ).one( 'click', function() {
                    $submenu.fadeOut( 100 );
                } );
            } );
        } else 
            $submenu.fadeOut( 100 );

        // don't follow the link
        return false;
    }