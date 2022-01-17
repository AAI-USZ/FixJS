function () {
        //file have finished loading,
        //if there is more file to load, we should put the next file on the head
        if (this.order + 1 < cc.loadQue.length) {
            cc.$('head').appendChild(cc.loadQue[this.order + 1]);
            //console.log(this.order);
        }
        else {
            cc.setup("gameCanvas");
            //we are ready to run the game
            cc.Loader.shareLoader().onloading = function () {
                cc.LoaderScene.shareLoaderScene().draw();
            };
            cc.Loader.shareLoader().onload = function () {
                cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            };
            //preload ressources
            cc.Loader.shareLoader().preload([
                {type:"image", src:"Resources/HelloWorld.png"},
                {type:"image", src:"Resources/CloseNormal.png"},
                {type:"image", src:"Resources/CloseSelected.png"}
            ]);
        }
    }