function (source, dest) {
		     source.keyup(function(e){
		          dest.val(source.val().toLowerCase().replace(/[^_-a-zA-Z0-9\s]+/ig, "").replace(/\s+/g, "_"));
		     });
		}