function handleURIs (uris) {
			var $domIC = INNERCONTEXT.DOM['Main‿div‿imageContainer'];

			var walkURIArray = function walkURIArray (uri) {
				$domIC.trigger({ type: 'haveRemote', uri: uri }, [INNERCONTEXT.UTILITY.supportedImageType(uri)]);
			};

			switch (!0) {
				case (!!uris.file_list && !!uris.file_list.length): // local file(s)
					$domIC.trigger({ type: 'haveLocalFileList' , list: uris.file_list });
					break;
				case (!!uris.uri && !!uris.uri.length): // remote image drag/dropped
					walkURIArray(uris.uri);
					break;
				case (!!uris.text && !!uris.text.length): // plaintext list of urls drag/dropped
					uris.text.forEach(walkURIArray);
					break;
				default:
					$.log('This is not something which can provide a usable image.');
			}
		}