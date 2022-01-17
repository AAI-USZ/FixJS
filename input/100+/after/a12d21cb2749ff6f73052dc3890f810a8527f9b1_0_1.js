function(source)
{
        //erases older content
        $(this.htmlPlayer).empty();   
        
		var filename = source.substr(0, source.lastIndexOf('.'));

        
        //load a new content base on file type
	switch (this.p.source.type.split("/")[0]) {
		case "video": {
			// type = video/*
			$(this.htmlPlayer).append("<source type='video/webm' src='" + filename + ".webm'></source>");
			$(this.htmlPlayer).append("<source type='video/ogg' src='" + filename + ".ogg'></source>");
			$(this.htmlPlayer).append("<source type='video/mp4' src='" + filename + ".mp4'></source>");
			break;
		}
		case "audio": {
			// type = audio/*
			$(this.htmlPlayer).append("<source type='audio/mpeg' src='" + filename + ".mp3'></source>");
			$(this.htmlPlayer).append("<source type='audio/ogg' src='" + filename + ".ogg'></source>");
			break;
		}
		case "image": {
			// type = image/*
			$(this.htmlPlayer).attr("src",source);
			break;
		}
		case "application": {
			// type = application/*
			// não faz nada
            break;
		}
		case "text": {
			if (this.checkType(["text/plain","text/html"])) {
				// type = text/plain, text/html
				$.ajax({
					type: "GET",
					url: source,
					dataType: "text",
					success: $.proxy(function (data) {
						$(this.htmlPlayer).append(data);
					},this)
				});
			} else {
				// TODO?
			}
			break;
		}
	}
    
}