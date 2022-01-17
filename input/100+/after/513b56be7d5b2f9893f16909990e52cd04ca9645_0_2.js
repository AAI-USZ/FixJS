function (photos) {
			var openedID;
			$('.photoset', photos).each(function(){
				var thisID = $(this).attr('id');
				if ($(this).hasClass('opened')){
					openedID = thisID;
				};
				controls = $('<div class="controls" id='+thisID+' >');
				nextbutton = $('<div id="next-'+thisID+'" class="next"><p>&#187;</p></div>');
				prevbutton = $('<div id="prev-'+thisID+'" class="prev"><p>&#171;</p></div>');
				$('.activearea').append(controls);
				controls.append(nextbutton);
				controls.append(prevbutton);
				if (thisID != openedID){
					controls.hide();
				}
				
				$(this).cycle({
					fx: 'fade',
					prev: '#prev-'+thisID+'',
					next: '#next-'+thisID+'',
					timeout: 0
				});
				
				//Photoset.prototype.toggleButtons($(this));	
			});
			
			
		}