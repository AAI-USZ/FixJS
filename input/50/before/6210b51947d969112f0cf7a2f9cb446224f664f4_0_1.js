function(format) {
				if (!formatChangeData[format]) {
					formatChangeData[format] = [];
				}

				formatChangeData[format].push(callback);
			}