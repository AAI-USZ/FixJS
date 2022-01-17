function(){//find in every identifiers
        	identifiers.push($(this).html());
        	var ident = $(this).html();
        	if(ident.indexOf('nla.party-')>=0){
        		if(ident.indexOf('http://')==0){
        			//is a link
        			$('#endlink').prepend('<a href="'+ident+'">View the record for this Party in Trove</a><br/>');
        		}else{
					//is not a link
					$('#endlink').prepend('<a href="http://'+ident+'">View the record for this Party in Trove</a><br/>');
        		}
        	}
        }