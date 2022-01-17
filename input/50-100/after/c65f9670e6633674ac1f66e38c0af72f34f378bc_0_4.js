function() {
            pop.media.children[ 0 ].src = "http://piweek.net/media/files/greenmine.ogg";
            pop.media.children[ 1 ].src = "http://piweek.net/media/files/greenmine.webm";
            pop.load();
            pop.autoplay( false );
            pop.on('loadeddata', function() {
                this.currentTime( time + 3 );
                this.play();
            }, false);
        }