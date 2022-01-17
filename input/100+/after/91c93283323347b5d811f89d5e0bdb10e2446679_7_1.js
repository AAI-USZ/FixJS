function(){
        var cleanFunc = window["clean" + $.mobile.activePage.attr('id')];
        if( cleanFunc != null )
            cleanFunc();
    }