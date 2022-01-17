function () {
		var carouselHtml = '<div id="myCarousel" class="carousel">'
			+ '<div class="carousel-inner">'
			+ '<div class="active item"/>'
			+ '<div class="item"/>'
			+ '</div>'
			+ '<a class="carousel-control" href="#myCarousel" data-slide="1">1</a>'
			+ '</div>';
		$('#qunit-fixture').append(carouselHtml);
		$('#myCarousel').carousel();
		$('#myCarousel').find('.carousel-control').click();
		ok($('#myCarousel').find('.item').eq($('#myCarousel').find('.carousel-control').data('slide')).hasClass('active'));
	}