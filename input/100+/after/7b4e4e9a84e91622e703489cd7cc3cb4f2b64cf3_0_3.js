function(arr) {
			var i, j, len, len_, out, el,
				bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
			for(i = 0, len = arr.length; i < len; i++) {
				el = arr[i]
				if(el.buffer) {
					if(el.length !== el.buffer.byteLength) {
						out = new Uint8Array(len_ = el.length);
						for(j = 0; j < len_; j++) {
							out[j] = el[j];
						}
						bb.append(out.buffer);
					} else {
						bb.append(el.buffer);
					}
				} else {
					bb.append(el);
				}
			}
			return bb.getBlob();
		}