function performSearch() {

				var params = {

					term: (jQuery('#keyword').val()),

					country: 'US',

					media: 'music',

					entity: 'song',

					//attribute: 'artistTerm,albumTerm,songTerm,musicTrackTerm',

					limit: 21,

					callback: 'handleTunesSearchResults'

				};

				var params = urlEncode(params);



				var url = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?' + params;

				var html = '<script src="' + url + '"><\/script>';

				jQuery('head').append(html);

			}