function(){

		var href = $(this).children("a").attr("href");

		var reg = new RegExp(href, "i");

		if(href && reg.test(url)){

			$(this).addClass("active");

			$(this).children("a").children("i").addClass("icon-white");

		}

	}