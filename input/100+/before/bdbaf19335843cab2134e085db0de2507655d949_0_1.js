function(r) {
				// success
				console.log("Code = " + r.responseCode);
				console.log("Response = " + r.response);
				console.log("Sent = " + r.bytesSent);
				var data = JSON.parse(r.response);
				if (data.upload.result === 'Success') {
					d.resolve(data.upload.filekey);
				} else {
					d.reject(data);
				}
			}