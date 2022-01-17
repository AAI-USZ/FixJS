function( direction ){
        if ( v.index && v.index % v.options.postsPerPage === 0 ){
            v.scrollState.page += direction === 'up' ? -1 : 1;
            mc.emit( 'pageChanged', v.scrollState.page );
        }
        return this;
    }