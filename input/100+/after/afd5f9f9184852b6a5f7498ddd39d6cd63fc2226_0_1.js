function(win,doc,undefined) {

	'use strict';

	win.jModal = function(breakpoints) {

		// global variables
		var $jmodal = '';
		var $jmodalContent = '';
		var $selected = '';
		var $busyloader = '';
		var modalPadding = 16;
		var galleryHeight = 70;

		var init = function() {

			$('.jmodal').bind('click.jmodal',function(e) {
				e.preventDefault();

				var $this = $(this);

				showBusyLoader($('body'));
				($this.data('type') === 'image') ? loadImage($this,loadModal) : loadVideo($this,loadModal);
			});

			// fix indexOf in ie
			if (!Array.prototype.indexOf) {
				Array.prototype.indexOf = function(obj, start) {
					for (var i = (start || 0), j = this.length; i < j; i++) {
						if (this[i] === obj) { return i; }
					}
					return -1;
				}
			}

		};


		/* image preloader
		========================================================================== */
		var loadImage = function(elm,callback) {
			var $this = elm;
			var img = document.createElement('img');

			img.onload = function() {
				callback(img,elm);
			};
			img.src = $this.attr('href');
		};


		/* youtube video
		========================================================================== */
		var loadVideo = function(elm,callback) {
			var $this = elm;
			var video = '<iframe width="640" height="390" src="http://www.youtube.com/embed/' + videoID($this.attr('href')) + '" frameborder="0" allowfullscreen></iframe>';

			callback(video,$this);
		};

		var videoID = function(url) {
			var queryString = url.split('?');
			var params = queryString[1].split('&');
			var v = '';

			for (var i = 0; i < params.length; i++) {
				if (params.indexOf('v=')) {
					var videoParam = params[i].split('=');
					v = videoParam[1];

					break;
				}
			}

			return v;
		};


		/* modal
		========================================================================== */
		var loadModal = function(elm,link) {

			$jmodal = $('<div id="jmodal-modal"><div class="jmodal-content"></div><a href="#" class="jmodal-close">X</a></div>').appendTo('body');
			$jmodalContent = $jmodal.find('.jmodal-content');

			hideBusyLoader();
			BlockUI();
			addGalleryLinks(link);

			// append element to modal
			$jmodalContent.append(elm);

			// measure container
			var height = $jmodal.outerHeight();
			var width = $jmodal.outerWidth();
			var imgHeight = $jmodalContent.height();
			var imgWidth = $jmodalContent.width();
			var browser = winHeight();

			// position modal for animation
			$jmodal
				.css({
					'height': imgHeight,
					'margin-left': ((width/2) * -1),
					'margin-top': 0,
					'top': ((height * -1) - 10),

					'width': imgWidth
				})
				.delay(400)
				.animate({
					'top': ((browser - height)/2)
				},300,function() {
					closeModal($jmodal);

					$jmodal
						.css({
							'top': '50%',
							'margin-top': ((height/2) * -1)
						});
				});
		};

		var closeModal = function(modal) {
			var $jmodal = $(modal);
			var height = $jmodal.outerHeight();
			var browser = winHeight();

			$('.jmodal-close, #UIBlock').click(function(e) {
				e.preventDefault();

				$jmodal
					.css({
						'margin-top': 0,
						'top': ((browser - height)/2)
					})
					.animate({
						'top': ((height * -1) - 10)
					},300,function() {
						$jmodal.remove();
						unBlockUI();
					});
			});
		};


		/* gallery
		========================================================================== */
		var addGalleryLinks = function(elm) {

			var galleryContent = '';
			if ($(elm).attr('rel')) {

				var i = 1;
				$('[rel=' + $(elm).attr('rel') + ']').each(function() {

					var selectedLink = ($(this).attr('href') === $(elm).attr('href')) ? 'selected' : '';
					galleryContent += '<a href="' + $(this).attr('href') + '" class="jmodal-gallery-link ' + selectedLink + '">' + i + '</a>';

					i++;
				});
				$jmodal
					.addClass('jmodal-modal-gallery')
					.append('<p class="jmodal-gallery-links"><a href="#" class="jmodal-gallery-prev">Prev</a>' + galleryContent + '<a href="#" class="jmodal-gallery-next">Next</a></p>');

				$selected = $jmodal.find('.selected');
				bindGalleryLinks();
			}
		};

		var bindGalleryLinks = function() {
			$('.jmodal-gallery-link').click(function(e) {
				e.preventDefault();

				var $this = $(this);
				if (!$this.hasClass('selected')) {
					advanceGallery($this);
				}
			});

			$('.jmodal-gallery-prev').click(function(e) {
				e.preventDefault();

				var $prev = $selected.prev().not(this);
				if ($prev.length !== 0) {
					advanceGallery($prev);
				}
			});

			$('.jmodal-gallery-next').click(function(e) {
				e.preventDefault();

				var $next = $selected.next().not(this);
				if ($next.length !== 0) {
					advanceGallery($next);
				}
			});
		};

		var advanceGallery = function(elm) {
			$jmodalContent
				.find('img')
				.animate({
					'opacity': 0
				},100);
			loadImage(elm,dispGalleryImg);
		};

		var dispGalleryImg = function(img,link) {
			$jmodalContent.empty();

			$selected.removeClass('selected');
			$selected = $(link).addClass('selected');

			var $img = $(img);
			$img
				.appendTo($jmodalContent)
				.css({
					'opacity': 0
				});

			var newHeight = $img.height();
			var newWidth = $img.width();

			$jmodal
				.animate({
					'height': newHeight,
					'margin-left': ((newWidth + (modalPadding*2))/2) * -1,
					'margin-top': ((newHeight + (modalPadding+galleryHeight))/2) * -1,
					'width': newWidth
				},300,function() {
					$img.animate({
						'opacity': 1
					},300);
				});
		};


		/* ui block
		========================================================================== */
		var BlockUI = function() {
			if ($("#UIBlock").length === 0) {
				$('<div id="UIBlock" />')
					.css({
						'background': '#000',
						'height': '100%',
						'left': 0,
						'opacity': 0,
						'position': 'fixed',
						'top': 0,
						'width': '100%',
						'z-index': 900
					})
					.appendTo('body')
					.animate({
						'opacity': 0.8
					},180);
				if ($.browser.msie && ($.browser.version < 7)) {
					$('#UIBlock').css({
						'position': 'absolute',
						'top': $(window).scrollTop()
					});
				}
			}
		};

		var unBlockUI = function() {
			$('#UIBlock')
				.fadeOut(180,function() {
					$(this).remove();
				});
		};


		/* busy loader
		========================================================================== */
		var showBusyLoader = function(elm) {
			$busyloader = $('<div id="modal-busyloader"></div>')
				.appendTo(elm)
				.css({
					'opacity': 0,
					'margin-top': -50
				})
				.animate({
					'opacity': 1,
					'margin-top': -30
				},300);
		};

		var hideBusyLoader = function() {
			$busyloader
				.animate({
					'opacity': 0,
					'margin-top': -50
				},200,function() {
					$busyloader.remove();
				});
		};


		/* utilities
		========================================================================== */

		// cross browser window height
		var winHeight = function() {

			var h = 0;

			// IE
			if (!window.innerHeight) {

				if (!(document.documentElement.clientHeight === 0)) {

					// strict mode
					h = document.documentElement.clientHeight;
				} else {

					// quirks mode
					h = document.body.clientHeight;
				}
			} else {

				// w3c
				h = window.innerHeight;
			}

			return h;
		};


		/* init
		========================================================================== */
		init();

	};

}