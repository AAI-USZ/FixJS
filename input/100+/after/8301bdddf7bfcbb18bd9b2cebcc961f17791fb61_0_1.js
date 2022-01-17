function () {
			// signature is (channel, [payload, ]*, [options], [callback])

			var channel = Array.prototype.shift.apply(arguments);			

			if (typeof channel !== 'string') 
				throw new Error('The channel parameter must be the channel URI string.');

			// determine notification template parameters

			var params = []; 
			if (typeof arguments[0] === 'object') {
				// parameters are provided as an object; use property naming conventions to convert 
				// to a parameter array; e.g. 
				// {
				//		image1src: 'http://....',
				//		image1alt: 'Picture of a barking dog',
				//		image2src: 'http://....',
				//		image2alt: 'A bone',
				// 	    text1: 'First text entry',
				//      text2: 'Second text entry'
				// }
				
				var payload = Array.prototype.shift.apply(arguments);

				for (var i = 1; i <= imageCount; i++) {
					var src = payload['image' + i + 'src'];
					var alt = payload['image' + i + 'alt'];
					if (typeof src !== 'undefined' && typeof src !== 'string')
						throw new Error('The image' + i + 'src property of the payload argument must be a string.');
					if (typeof alt !== 'undefined' && typeof alt !== 'string')
						throw new Error('The image' + i + 'alt property of the payload argument must be a string.');

					params.push(src || '');
					params.push(alt || '');
				}

				for (var i = 1; i <= textCount; i++) {
					var text = payload['text' + i];
					if (typeof text !== 'undefined' && text !== null && typeof text !== 'string')
						text = text.toString();

					params.push(text || '');
				}
			}
			else {
				// assume parameters are provided as atomic, string arguments of the function call

				while (typeof arguments[0] === 'string') 
					params.push(Array.prototype.shift.apply(arguments));
			}

			var options = typeof arguments[0] === 'object' ? Array.prototype.shift.apply(arguments) : {};
			var callback = arguments[0];

			// validate required number of parameters was specified

			if (params.length !== (textCount + imageCount * 2))
				throw new Error('The ' + templateName + ' WNS notification type requires ' + (textCount + imageCount * 2)
					+ ' text parameters to be specified (' + imageCount + ' image(s) that require href and alt text each, and '
					+ textCount + ' text field(s)), while only ' + params.length + ' parameter(s) have been provided.');

			// XML escape text parameters and construct payload from template

			var xmlEscapedParams = [ template, '' ]; // placeholder for optional attributes of the type element

			params.forEach(function (text) {
			    xmlEscapedParams.push(xmlEscape(text));
			});

			// add optional audio element (without XML escaping since it is XML)

			xmlEscapedParams.push(createAudio(type, options));

			// add optional toast attributes

			xmlEscapedParams[1] = createToastAttributes(type, options);

			var payload = util.format.apply(this, xmlEscapedParams);

			// send notification

			return exports.send(channel, payload, 'wns/' + type, options, callback);
		}