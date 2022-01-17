function (err, data, rOffset) {
			if (err) {
				if (rOffset === 0) {
					return;
				}
				return this.cb(err);
			}

			// update total; rOffset should always be 512
			totalRead += rOffset;
			buffer = tBuf.slice(rOffset);

			fileStream = new Stream();

			if (this.fileTypes.indexOf(data.type) >= 0) {
				// we'll let the user know if they want this type of file
				this.cb(err, data, fileStream);
			}

			if (buffer.length >= data.size) {
				fileStream.emit('data', buffer.slice(0, data.size));
				fileStream.emit('end');
				totalRead += data.size;
				buffer = buffer.slice(data.size);

				fileStream = undefined;

				// recurse, we still have data
				return write.call(this);
			}

			leftToRead = data.size - buffer.length;
			fileStream.emit('data', buffer);
			totalRead += buffer.length;

			buffer = undefined;
		}