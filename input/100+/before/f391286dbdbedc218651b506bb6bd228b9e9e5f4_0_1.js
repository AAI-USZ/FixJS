function (field) {
			var tBuf = buf.slice(offset, offset + field.length),
				tString = tBuf.toString();

			offset += field.length;

			if (field.field === 'ustar' && !/ustar/.test(tString)) {
				// end the loop if not using the extended header
				return true;
			} else if (field.field === 'chksum') {
				updateChecksum('        ');
			} else {
				updateChecksum(tString);
			}

			if (field.type === 'string') {
				data[field.field] = readString(tBuf);
			} else if (field.type === 'number') {
				data[field.field] = readInt(tString);
			}
		}