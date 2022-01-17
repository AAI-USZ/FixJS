function (url, callback, mimeType) {
		var req;

		function getXHR () {
			if (window.XMLHttpRequest
				&& ('file:' !== window.location.protocol || !window.ActiveXObject)) {
				return new XMLHttpRequest();
			} else {
				try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) {}
				try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {}
				try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (e) {}
				try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) {}
			}
			return false;
		}

		function send () {
			req = getXHR();
			if (mimeType && req.overrideMimeType) {
				req.overrideMimeType(mimeType);
			}
			req.open("GET", url, true);
			req.onreadystatechange = function (e) {
				if (req.readyState === 4) {
					if (req.status < 300) {
						callback(req);
					}
				}
			};
			req.send(null);
		}
		function abort (hard) {
			if (hard && req) {
				req.abort(); return true;
			}
			return false;
		}

		return {abort: abort,send: send};
	}