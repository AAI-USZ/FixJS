function(){
        this._FPSLabel = cc.LabelTTF.create("00.0",cc.SizeMake(60,16), cc.TEXT_ALIGNMENT_RIGHT, "Marker Felt", 18);
        this._SPFLabel = cc.LabelTTF.create("0.000",cc.SizeMake(60,16), cc.TEXT_ALIGNMENT_RIGHT, "Marker Felt", 18);
        this._drawsLabel = cc.LabelTTF.create("000",cc.SizeMake(60,16), cc.TEXT_ALIGNMENT_RIGHT, "Marker Felt", 18);

        this._drawsLabel.setPosition( cc.ccpAdd( new cc.Point(20,48), cc.DIRECTOR_STATS_POSITION ) );
        this._SPFLabel.setPosition( cc.ccpAdd( new cc.Point(20,30), cc.DIRECTOR_STATS_POSITION ) );
        this._FPSLabel.setPosition( cc.ccpAdd( new cc.Point(20,10), cc.DIRECTOR_STATS_POSITION ) );
    }