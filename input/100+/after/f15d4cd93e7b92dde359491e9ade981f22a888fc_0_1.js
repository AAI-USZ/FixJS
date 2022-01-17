function prepareScene(){




    //<<-------------win
    var bg = new SpriteSheet({
        // image to use
        images: [img.win_bg],
        // width, height & registration point of each sprite
        frames: {width: 640, height: 960, regX: 0, regY: 0},
        animations: {
            idle: [0, 1, "idle", 32]
        }
    });

    var bfAnim = new BitmapAnimation(bg);
    bfAnim.gotoAndPlay("idle");
    scene.win.addChild(bfAnim);

    scene.win.bossMan = new Bitmap(bossMan.img.big);
    scene.win.bossMan.regX = 250;
    scene.win.bossMan.regY = 250;
    scene.win.bossMan.x = 320;
    scene.win.bossMan.y = 480;
    scene.win.bossMan.visible = false;
    scene.win.addChild(scene.win.bossMan);

    scene.win.woodMan = [];
    for(var n = 0, nmax = woodManNum; n<nmax; n++){
        scene.win.woodMan[n] = new Bitmap(woodMan[n].img.big);
        scene.win.woodMan[n].regX = 250;
        scene.win.woodMan[n].regY = 250;
        scene.win.woodMan[n].x = 320;
        scene.win.woodMan[n].y = 480;
        scene.win.woodMan[n].visible = false;
        scene.win.addChild(scene.win.woodMan[n]);
    }
    //win--------->>


    //<<-------------main
    var bg = new SpriteSheet({
        // image to use
        images: [img.hongxing],
        // width, height & registration point of each sprite
        frames: {width: 640, height: 960, regX: 0, regY: 0},
        animations: {
            idle: [0, 1, "idle", 32]
        }
    });

    var bfAnim = new BitmapAnimation(bg);

    bfAnim.gotoAndPlay("idle");
    scene.main.addChild(bfAnim);

    var s;
    scene.main.alert = [];
    for(var n=0;n < 3; n++){
        s = drawOne();
        scene.main.alert.push(s);
        s.scaleX = 0.7;
        s.scaleY = 0.7;
        s.x = 120 + 160 * n;
        s.y = 50;
        s.visible = false;
        scene.main.addChild(s);
    }
    //main-------------->>


    //<<---------enter
    var bg = new SpriteSheet({
        // image to use
        images: [img.hongxing],
        // width, height & registration point of each sprite
        frames: {width: 640, height: 960, regX: 0, regY: 0},
        animations: {
            idle: [0, 1, "idle", 32]
        }
    });

    var bfAnim = new BitmapAnimation(bg);

    bfAnim.gotoAndPlay("idle");
    bfAnim.alpha = 0.3;
    scene.enter.addChild(bfAnim);
    scene.enter.focusRole = {};

    scene.enter.woodMan = [];
    for(var n=0, nmax = woodManNum; n<nmax; n++){
        scene.enter.woodMan[n] = new Bitmap(woodMan[n].img.small_face);
        scene.enter.woodMan[n].regX = 94;
        scene.enter.woodMan[n].regY = 214;
        scene.enter.woodMan[n].x = 250 + 150*n;
        scene.enter.woodMan[n].y = 600;
        scene.enter.woodMan[n].scaleX = 0.6;
        scene.enter.woodMan[n].scaleY = 0.6;
        scene.enter.woodMan[n].onClick = function(name){
            return function(){
                roleSelete(name);

                //hide all small role
                for(var n=0, nmax = woodManNum; n<nmax; n++){
                    scene.enter.woodMan[n].visible = false;
                }
                scene.enter.bossMan.visible = false;

                //show focus big role
                scene.enter.focusRole.woodMan[name].visible = true;
            }
        }(n);
        scene.enter.addChild(scene.enter.woodMan[n]);


        scene.enter.addChild(scene.win.woodMan[n]);
    }
    scene.enter.focusRole.woodMan = [];
    for(var n = 0, nmax = woodManNum; n<nmax; n++){
        scene.enter.focusRole.woodMan[n] = new Bitmap(woodMan[n].img.big);
        scene.enter.focusRole.woodMan[n].regX = 250;
        scene.enter.focusRole.woodMan[n].regY = 250;
        scene.enter.focusRole.woodMan[n].x = 320;
        scene.enter.focusRole.woodMan[n].y = 480;
        scene.enter.focusRole.woodMan[n].visible = false;
        scene.enter.addChild(scene.enter.focusRole.woodMan[n]);
    }


    scene.enter.bossMan = new Bitmap(bossMan.img.small_face);
    scene.enter.bossMan.x = 100;
    scene.enter.bossMan.y = 600;
    scene.enter.bossMan.regX = 60;
    scene.enter.bossMan.regY = 128;
    scene.enter.bossMan.onClick = function(){
        //return function(){
            roleSelete("boss");

            //hide all small role
            for(var n=0, nmax = woodManNum; n<nmax; n++){
                scene.enter.woodMan[n].visible = false;
            }
            scene.enter.bossMan.visible = false;

            //show focus big role
            scene.enter.focusRole.bossMan.visible = true;
        //}

    }
    scene.enter.addChild(scene.enter.bossMan);




    scene.enter.focusRole.bossMan = new Bitmap(bossMan.img.big);
    scene.enter.focusRole.bossMan.regX = 250;
    scene.enter.focusRole.bossMan.regY = 250;
    scene.enter.focusRole.bossMan.x = 320;
    scene.enter.focusRole.bossMan.y = 480;
    scene.enter.focusRole.bossMan.visible = false;




    scene.enter.addChild(scene.enter.focusRole.bossMan);


    //enter------------>>


}