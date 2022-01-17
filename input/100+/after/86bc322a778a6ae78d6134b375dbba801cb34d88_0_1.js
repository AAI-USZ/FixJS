function handleURIs (uris) {
			switch (!0) {
				case (void 0 !== uris.file_list && !!uris.file_list.length): // local file(s)
					$.log('imageContainer: drop ==> local file');
					INNERCONTEXT.UTILITY.loadLocalFile(uris.e);  // TODO: Not yet migrated!
					break;
				case (void 0 !== uris.uri && !!uris.uri.length): // remote image drag/dropped
					$.log('imageContainer: drop ==> uri');
					uris.text = [uris.uri];
					/* falls through */
				case (void 0 !== uris.text && !!uris.text.length): // plaintext list of urls drag/dropped
					$.log('imageContainer: drop ==> list of uris');

				var walkURIArray = function walkURIArray (uri) {
						//var type = supportedImageType(uri);
						//$.log('imageContainer: ' + type + ' detected at ' + uri);
						//if (type) {
							//loadRemoteFile(uri, type);  // TODO: Not yet migrated!
						//} else {
						//	$.log(uri + ' does not appear to be an image; trying it as a webpage.');
							//getRemotePage(uri);  // TODO: Not yet migrated!
						//}
					};

					uris.text.forEach(walkURIArray);
					break;
				default:
					$.log('This is not something which can provide a usable image.');
			}
		}