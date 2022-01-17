function(e){
						jQuery(this_id_prefix+'#loading').css({display:'none'}); 
						jQuery(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
					}