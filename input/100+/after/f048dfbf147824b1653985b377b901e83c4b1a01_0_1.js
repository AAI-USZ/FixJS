function(e) {
					$('.span7').prepend($('<div class="alert"><a class="close" data-dismiss="alert" href="#">&times;</a><strong>Error!</strong> There was an error loading your image.</div>').alert());
					console.log(this, e);
				}