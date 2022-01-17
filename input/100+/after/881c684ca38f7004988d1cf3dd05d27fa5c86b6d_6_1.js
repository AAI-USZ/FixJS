function (dictionary) {
        var animations = dictionary["animations"];
        if(!animations){
            cc.Log("cocos2d: cc.AnimationCache: No animations were found in provided dictionary.");
            return ;
        }

        var version = 1;
        var properties = dictionary["properties"];
        if(properties){
           version = (properties["format"] != null) ? parseInt(properties["format"]) : version;
            var spritesheets = properties["spritesheets"];
            for(var i = 0; i< spritesheets.length; i++){
                cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(spritesheets[i]);
            }
        }

        switch (version){
            case 1:
                this._parseVersion1(animations);
                break;
            case 2:
                this._parseVersion2(animations);
                break;
            default :
                cc.Assert(false, "Invalid animation format");
                break;
        }
    }