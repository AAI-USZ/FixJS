function() {
            pop.media.children[ 0 ].src = Piweek.mediaUrl("/files/greenmine.ogg");
            pop.media.children[ 1 ].src = Piweek.mediaUrl("/files/greenmine.webm");
            pop.load();
            pop.autoplay( false );
            pop.on('loadeddata', function() {
                this.currentTime( time + 3 );
                this.play();
            }, false);
        }