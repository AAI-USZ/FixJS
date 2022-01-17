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