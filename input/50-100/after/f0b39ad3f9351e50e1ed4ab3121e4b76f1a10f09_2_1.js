function() {
		var src = $("#picture").attr('src');
		window.resolveLocalFileSystemURI(src, 
			function(fileEntry) {
				//alert("success!" + src);
				fileEntry.remove( function(entry) {
									//alert("removal of successfull");
									$("picture").attr('src', "");
									deleteFromCommentUI(src);
									showCommentUI();								
								}, 
								  function(error) {
								  	alert("error removing file: " + error.code);
								  });
			}, 
			function(fileEntry) {
				alert("failed!");
			});
	}