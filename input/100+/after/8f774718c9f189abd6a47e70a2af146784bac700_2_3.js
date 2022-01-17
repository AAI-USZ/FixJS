function(){

	

	$('body').on('click', '.video a.markAsWatched', function(ev){

		ev.preventDefault();



		var $el = $(this),

			$video = $el.closest('.video'),

			$li = $video.closest('li'),

			id = $video.attr('data-id'),

			provider = $video.attr('data-provider');



		if ($el.hasClass('btn-large')) {

			$el.addClass('hidden');

			$('.markAsUnwatched').removeClass('hidden');

		} else {

			$el.removeClass('markAsWatched').addClass('markAsUnwatched').attr('title', 'Mark as unwatched').html('Mark as unwatched');

			$('#videos.watchedVideos').append($li);

		}

		$.get('/markAsWatched/' + provider + "/" + id);

		return false;

	})



	$('body').on('click', '.video a.markAsUnwatched', function(ev){

		ev.preventDefault();



		var $el = $(this),

			$video = $el.closest('.video'),

			$li = $video.closest('li'),

			id = $video.attr('data-id'),

			provider = $video.attr('data-provider');

		

		if ($el.hasClass('btn-large')) {

			$el.addClass('hidden');

			$('.markAsWatched').removeClass('hidden');

		} else {

			$el.removeClass('markAsUnwatched').addClass('markAsWatched').attr('title', 'Mark as watched').html('Mark as watched');

			$('#videos.unwatchedVideos').append($li);

		}

		$.get('/markAsUnwatched/' + provider + "/" + id);

		console.log("mark video as unwatched ", provider, id);

		return false;

	})



	$('body').on('click', '.video a.delete', function(ev){

		ev.preventDefault();



		var $el = $(this),

			$video = $el.closest('.video'),

			$li = $video.closest('li'),

			id = $video.attr('data-id'),

			provider = $video.attr('data-provider');



		$li.remove();

		$.get('/removeVideo/' + provider + "/" + id);

		console.log("delete video ", provider, id);

		return false;

	})







	$('body').on('click', '#videoMeta a.addVideo', function(ev){

		ev.preventDefault();



		var $el = $(this),

			id = $el.attr('data-id'),

			provider = $el.attr('data-provider');



		$el.addClass('hidden');

		$('.markAsWatched').removeClass('hidden');



		$.get('/addVideo/' + provider + "/" + id);

		return false;

	})





	$('body').on('click', 'body.mine #addEmail', function(ev){

		ev.preventDefault();

		var email = encodeURIComponent($('#emailAddress').val());



		$.ajax({

			url: '/addEmail?email='+email,

			type: "GET",

			success: function(){

				$('#emailNotificationSent').removeClass('hidden');

				$('#emailNotificationError').addClass('hidden');

			},

			error: function(){

				$('#emailNotificationSent').addClass('hidden');

				$('#emailNotificationError').removeClass('hidden');

			}

		})

		return false;

	});



	$('body').on('click', 'body.mine #setPeriod', function(ev){

		ev.preventDefault();

		var period = encodeURIComponent($('#emailAddress').val());



		$.ajax({

			url: '/addEmail?email='+email,

			type: "GET",

			success: function(){

				$('#emailNotificationSent').removeClass('hidden');

				$('#emailNotificationError').addClass('hidden');

			},

			error: function(){

				$('#emailNotificationSent').addClass('hidden');

				$('#emailNotificationError').removeClass('hidden');

			}

		})

		return false;

	});





	function onResize() {

		var vHeight = $(window).height(),

			vWidth = $(window).width();			

		

		if ($('body').hasClass('video')) {



			var $vF = $('.darkWrapper iframe:first'),

				width = 420,

				height = 315; 



			if (vWidth <= 600) { width = 420; height = 315; }

			else if (vWidth <= 1000) { width = 640; height = 480; }

			else if (vWidth <= 1300) { width = 960; height = 720; }

			else { width = 1280; height = 720; }



			console.log([vWidth, vHeight], "set iframe width & height to: ", [width,height]);

			$vF.attr('width', width).attr('height',height);

		}

	}



	$(window).resize(onResize)

	onResize();

}