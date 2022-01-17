function $_dataURItoBlob (dataURI, mime) {
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
			var bb = $.makeBlob(ab);

			bb = bb.getBlob ? /* BlobBuilder */      bb.getBlob()
                            : /* Blob constructor */ bb;

			return bb.getBlob('image/' + mime);
		}