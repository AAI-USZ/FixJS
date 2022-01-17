function () {

        // TODO animation, etc.

        /*

        hookTexture = cc.TextureCache.sharedTextureCache().addImage(s_hook);

        this.initWithTexture(hookTexture, cc.RectMake(0,0,20,20));

        this.setTag(this.zOrder);

        this.setPosition(this.appearPosition);

        

        // add animation

        */

        this._super();

        this.initWithFile(s_hook);

        

        this.rotateSpeed = global.Speed.rotate;

        this.launchSpeed = global.Speed.launch;

        this.retrieveSpeed = global.Speed.retrieve;

        

        // Swing Action

        var rotoLeft = cc.RotateTo.create(this.rotateSpeed, this.rotateLimit);

        var rotoRight = cc.RotateTo.create(this.rotateSpeed, -this.rotateLimit);

        var seq = cc.Sequence.create(rotoLeft, cc.DelayTime.create(0.1), rotoRight, cc.DelayTime.create(0.1));

        this.swingAction = cc.RepeatForever.create(seq);

        this.swing();

    }