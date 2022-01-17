function () {
                                
        var parent = new cc.Layer();
        __associateObjWithNative(this, parent);
        this.init();


        // background
        var node = cc.Reader.nodeGraphFromFile("MainMenu.ccbi", this);
        this.addChild( node );
    }