function() {
		    $("li:gt(4)", this).hide(); 
		    if($('li', this).length>5)$("li:nth-child(5)", this).after("<a href='#' class=\"more\">More...</a>");
		}