function (options) {

			var args = arguments;



			return $(this).each(function (i) {

				src = $(this).attr('src');

				id = $(this).attr('id') || 'websubs_' + ($.fn.websubs.c += 1);



				if (!src.match(/api=1/)) {

					src += (src.match(/\?/) ? '&' : '?') + 'api=1';

				}

				if (!src.match(/player_id=/)) {

					src += (src.match(/\?/) ? '&' : '?') + 'player_id=' + id;

				}

				if (src !== $(this).attr('src')) {

					$(this).attr('src', src);

				}



				width = $(this).width();

				height = $(this).height();



				el = $(this);

				el.attr('id', id);



				var useHTML5 = (defaults.forceHTML5 || options.forceHTML5) || isiPad;

				controller = useHTML5 ? methods.htmlController : methods.swfController;

				controller.el = el;

				controller.init.apply(controller.init, args);

			});

		}