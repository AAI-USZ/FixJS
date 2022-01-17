function ( item ) {
        var index = item.getAttribute( 'index' );
        var disabled = item.getAttribute( 'dis' );

        if ( disabled == 1 ) {
            return;
        }

        this.hideLayer();
        this.setSelectedIndex( parseInt( index, 10 ), true );
    }