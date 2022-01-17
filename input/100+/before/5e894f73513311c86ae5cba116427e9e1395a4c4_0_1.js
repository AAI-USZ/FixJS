function(up, file, json) {
		var j = jQuery.parseJSON(json.response);
		
		if(j.error !== undefined) {
			var row = $("<tr/>")
				.append('<td>' + file.name +'</td>')
				.append('<td>' + j.error.message + '</td>');
				
			$("#plupload_error").find("table").append(row);
		}else{
		    var tempFileName = j.tempfilepath;
		    $.get('/Plupload/copyfile/format/json/name/'+encodeURIComponent(file.name)+'/tempname/'+encodeURIComponent(tempFileName), function(json){
		        var jr = jQuery.parseJSON(json);
		        if(jr.error !== undefined) {
		            var row = $("<tr/>")
		                .append('<td>' + file.name +'</td>')
		                .append('<td>' + jr.error.message + '</td>');
		                
		            $("#plupload_error").find("table").append(row);
		        }
		    });
		}
	}