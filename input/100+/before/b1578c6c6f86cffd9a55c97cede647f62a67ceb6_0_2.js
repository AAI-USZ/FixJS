function(){
        this._FPSLabel = cc.LabelTTF.create("00.0", "Arial", 12);
        this._SPFLabel = cc.LabelTTF.create("0.000", "Arial", 12);
        this._drawsLabel = cc.LabelTTF.create("000", "Arial", 12);

        this._drawsLabel.setPosition( cc.ccpAdd( new cc.Point(0,34), cc.DIRECTOR_STATS_POSITION ) );
        this._SPFLabel.setPosition( cc.ccpAdd( new cc.Point(0,17), cc.DIRECTOR_STATS_POSITION ) );
        this._FPSLabel.setPosition( cc.DIRECTOR_STATS_POSITION );
    }