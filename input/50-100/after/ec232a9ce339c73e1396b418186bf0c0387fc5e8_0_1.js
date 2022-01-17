function(){
				var vid = $( this )[0];
				vid.play();
				vid.muted = false;
				
				console.log( $( this ).attr('volume') + ' muted? ' + $( this ).attr('muted') );
			}