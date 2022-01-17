function(url){
				if(/^\./.test(url)){
					// begins with a dot is always relative to page URL; therefore not xdomain
					return false;
				}
				if(/^\/\//.test(url)){
					// for v1.6- backcompat, url starting with // indicates xdomain
					return true;
				}
				// get protocol and host
				// \/+ takes care of the typical file protocol that looks like file:///drive/path/to/file
				// locationHost is falsy if file protocol => if locationProtocol matches and is "file:", || will return false
				var match = url.match(/^([^\/\:]+\:)\/+([^\/]+)/);
				return match && (match[1] != locationProtocol || (locationHost && match[2] != locationHost));
			}