function(data){
                        	if(data!=null){

                        	var html = "";
                        	for(var index in data.notes){
                        		if(CheckIfThisNoteNeedsToBeAdded(data.notes[index])){
			                        		html = html + CreateItem(data.notes[index], emailId);                        			
                        		}
                        	}
           					$('#container').prepend(html).masonry( 'reload' );
           					new Board().vote();
							//$('#container').append( $boxes ).masonry( 'prepended', $boxes );                   		
                        	}
                        }