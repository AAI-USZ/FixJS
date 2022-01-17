function(response){
		/*
            if ($('#quickpost').raw().value !== '') {
			$('#quickpost').raw().value = $('#quickpost').raw().value + "\n\n";
		}
		$('#quickpost').raw().value = $('#quickpost').raw().value + "[quote="+username+"]" + 
			//response.replace(/(img|aud)(\]|=)/ig,'url$2').replace(/\[url\=(https?:\/\/[^\s\[\]<>"\'()]+?)\]\[url\](.+?)\[\/url\]\[\/url\]/gi, "[url]$1[/url]")
			html_entity_decode(response)
		+ "[/quote]"; */
            insert( "[quote="+username+"]" +  html_entity_decode(response) + "[/quote]", 'quickpost');
		resize('quickpost');
	}