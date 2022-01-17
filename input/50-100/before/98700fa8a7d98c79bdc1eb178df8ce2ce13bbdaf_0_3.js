function performSearch2() {

				var params = {

					term: (jQuery('#keyword2').val()),

					country: 'US',

					media: 'music',

					entity: 'song',

					//attribute: 'artistTerm,albumTerm,songTerm,musicTrackTerm',

					limit: 12,

					callback: 'handleTunesSearchResults2'

				};

				var params = urlEncode(params);



				var url = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?' + params;

				var html = '<script src="' + url + '"><\/script>';

				jQuery('head').append(html);

			}