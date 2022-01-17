function(){
				$( this )
					//.fadeInAudio()
					.attr('volume', 1)
				[0].play();
				
				console.log( $( this ).attr('volume') + ' muted? ' + $( this ).attr('muted') );
			}