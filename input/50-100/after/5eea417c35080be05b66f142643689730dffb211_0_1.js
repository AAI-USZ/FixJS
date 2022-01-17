function requested() {
				alert("searching");

				var params = {

					term: (jQuery('#entry_1').val()),

					country: 'GB',

					media: 'music',

					entity: 'song',

					//attribute: 'artistTerm,albumTerm,songTerm,musicTrackTerm',

					limit: 1,

					callback: 'requestparse'

				};

				var params = urlEncode(params);



				var url = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?' + params;

				var html = '<script src="' + url + '"><\/script>';

				jQuery('head').append(html);

			}