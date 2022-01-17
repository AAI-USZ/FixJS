function(ns) {
        
    var UI_DATA = {
        LABELS: {
            children: [
                {
                    type:"Label",name:"scoreLabel",
                    x:240,y:360,width:480,fillStyle:"white",
                    text:"Chain Wave",fontSize:32,align:"top"
                }
            ]
        }
    }
    
    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
            
            // ラベル
            this.fromJSON(UI_DATA.LABELS);
        },
    
        update: function(){
            if( app.pointing.getPointingEnd() == true ){
                tm.sound.SoundManager.get("decide").play();
                var wave = Wave(this.scoreLabel.x*1.5, this.scoreLabel.y, 1500, 512, TITLE_WAVE_IMAGE);
                wave.plusScale = 0.02;
                this.addChild(wave);

                this.addChild( tm.fade.FadeOut(
                    app.width, app.height, "#000", 3000, function() {
                        app.replaceScene(MainScene());
                    })
                );
            }
        },
    
        // ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時
        onblur: function() {
            app.pushScene(PauseScene(this.op));
        }
    });
    
}