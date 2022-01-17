function(){
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
        }