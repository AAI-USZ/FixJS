function (message, url, line) {
				window.console.error(interpolate('Unhandled error. message=[{{0}}], url=[{{1}}], line=[{{2}}]', [message, url, line]));
				return false; // don't suppress default handling
			}