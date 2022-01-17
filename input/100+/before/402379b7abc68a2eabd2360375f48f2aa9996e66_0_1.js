function() {

            var timeStamp = new Date( 1970, 0, 1 ),
                time = p.currentTime(),
                seconds,
                width = ( time / p.duration() * 100 * timebar.offsetWidth / 100 );

            if ( progressBar ) {

              progressBar.style.width = width + "px";
            }

            if ( scrubber ) {

              scrubber.style.left = width - ( scrubber.offsetWidth / 2 ) + "px";
            }

            timeStamp.setSeconds( Math.round( time ) );
            seconds = timeStamp.toTimeString().substr( 0, 8 );

            if ( currentTimeDialog ) {

              currentTimeDialog.innerHTML = seconds;
            }
          }