function(){

		href = $(this).children("a").attr("href");

		if(href && new RegExp(href).test(url.toLowerCase())){

			$(this).addClass("active");

			$(this).children("a").children("i").addClass("icon-white");

		}

	}