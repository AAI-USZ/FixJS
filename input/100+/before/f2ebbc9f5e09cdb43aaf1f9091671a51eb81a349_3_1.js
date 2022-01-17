function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config.COCOS2D_DEBUG;
        cc.setup(this.config.tag);
        cc.AudioManager.sharedEngine().init("mp3,ogg");
        cc.Loader.shareLoader().onloading = function () {
            cc.LoaderScene.shareLoaderScene().draw();
        };
        cc.Loader.shareLoader().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
        cc.Loader.shareLoader().preload([
            {type:"image", src:"res/HelloWorld.png"},
            {type:"image", src:"res/CloseNormal.png"},
            {type:"image", src:"res/CloseSelected.png"}
        ]);
    }