function(texture){
        var size = cc.Director.sharedDirector().getWinSize();

        var pNode = cc.ProgressTimer.create(texture.getSprite());

        // but it is flipped upside down so we flip the sprite
        if(cc.renderContextType == cc.WEBGL)
            pNode.getSprite().setFlipY(true);
        pNode.setType(cc.CCPROGRESS_TIMER_TYPE_BAR);

        pNode.setMidpoint(cc.ccp(0, 0));
        pNode.setBarChangeRate(cc.ccp(0,1));

        pNode.setPercentage(100);
        pNode.setPosition(cc.ccp(size.width/2, size.height/2));
        pNode.setAnchorPoint(cc.ccp(0.5,0.5));

        return pNode;
    }