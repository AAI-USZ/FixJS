function jQuery_dataURItoBlob (dataURI, mime) {
			// convert base64 to raw binary data held in a string
			var byteString;
			if (dataURI.split(',')[0].indexOf('base64') >= 0) {
				byteString = atob(dataURI.split(',')[1]);
			} else {
				byteString = atob(dataURI); // The followup at stackoverflow is wrong here; this version is fixed.
			}

			// write the bytes of the string to an ArrayBuffer
			var ab = new ArrayBuffer(byteString.length),
				ia = new Uint8Array(ab);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}

			// write the ArrayBuffer to a blob, and you're done
			var bb;
			try { // Old API
				window.BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder;
				bb = new BlobBuilder();
				bb.append(ab);
			} catch (e) { // New API
				bb = new Blob([ab]);
			}

			return bb.getBlob('image/' + mime);
		}