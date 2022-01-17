function(to) {
			$('#mid a:link, #mid a:visited, #mid a:active, #content .comment h3 a:link, #content .comment h3 a:active, #content .comment h3 a:visited').css('color', to);
			$('#mid a:hover, #mid h1 a:hover, #mid h2 a:hover, #mid h3 a:hover, #mid h4 a:hover, #mid h5 a:hover, #mid h6 a:hover, #mid #sidebar a:hover, #mid #sidebar h1 a:hover, #mid #sidebar h2 a:hover, #mid #sidebar h3 a:hover, #mid #sidebar h4 a:hover, #mid #sidebar h5 a:hover, #mid #sidebar h6 a:hover, #content .comment h3 a:hover').css('border-bottom', '1px solid ' + to);
		}