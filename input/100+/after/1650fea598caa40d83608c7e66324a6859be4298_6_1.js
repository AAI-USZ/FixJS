function inflate(data, callback, progressCallback) {
		var fd = new FormData();
		fd.append('data', new Blob([data]));
		return xhr({uri: '/node/zlib?inflate', method: 'post', data: fd, responseType: 'arraybuffer', successCallback: function (x) {
			callback(x.response);
		}, progressCallback: progressCallback});
	}