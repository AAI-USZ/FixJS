function() {
            pop.media.children[ 0 ].src = "http://piweek.net/media/files/seekagift.ogg";
            pop.media.children[ 1 ].src = "http://piweek.net/media/files/seekagift.webm";
            pop.load();
            pop.autoplay( false );
            pop.on('loadeddata', function(e) {
                this.currentTime( time + 3 );
                this.play();
            }, false);
        }