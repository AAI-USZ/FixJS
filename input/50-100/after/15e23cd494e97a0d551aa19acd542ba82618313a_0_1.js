function ( item ) {
        var index = parseInt( item.getAttribute( 'index' ), 10 );
        var disabled = item.getAttribute( 'dis' );

        if ( disabled == 1 ) {
            return;
        }

        this.hideLayer();
        this.setSelectedIndex( index, index != this.selectedIndex );
    }