function() {
            pop.media.children[ 0 ].src = Piweek.mediaUrl("/files/tasaparo.ogg");
            pop.media.children[ 1 ].src = Piweek.mediaUrl("/files/tasaparo.webm");
            pop.load();
            pop.autoplay( false );
            pop.on('loadeddata', function(e) {
                this.currentTime( time + 3 );
                this.play();
            }, false);
        }