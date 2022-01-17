function() {
		    $("li:gt(5)", this).hide(); 
		    $("li:nth-child(6)", this).after("<a href='#' class=\"more\">More...</a>");
		}