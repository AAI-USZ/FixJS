function (filepath, input, opts, callback) {
		var data,
			mode,
			mtime,
			uid,
			gid,
			size,
      type,
      linkname,
      tape = this;

		opts = opts || {};

		mode = typeof opts.mode === 'number' ? opts.mode : parseInt('777', 8) & 0xfff;
		uid = typeof opts.uid === 'number' ? opts.uid : 0;
		gid = typeof opts.gid === 'number' ? opts.gid : 0;
		size = typeof opts.size === 'number' ? opts.size : input.length;
    linkname = typeof opts.linkname == 'string' ? opts.linkname : null;
    mtime = utils.calculateTarDate(opts.mtime, new Date());
    utils.fileTypeToIndex(opts.type, function(err, index) {
      type = err ? '0' : index.toString();
    });

    if (input && typeof input === 'object' && typeof input.resume === 'function') {
        input.resume();
    }

		// if you give me a stream, you must tell me how big it is
		// since the header comes first, the only other solution is to
		// cache the entire file before writing it out to a stream,
		// which completely invalidates the purpose of a stream
		if (input instanceof Stream && (typeof size !== 'number' || size < 0)) {
			if (opts.allowPipe) {
				size = -1;
			} else {
				console.error('Error:', size);
				return callback(new Error('Streams must supply the total size of the stream if allowPipe is not set.'));
			}
		}

    var filename = this.consolidate ? path.basename(filepath) : filepath;
    var prefix = null;
    if (filename.length > 100) {
      var offset = filename.indexOf('/', filename.length - 100);
      prefix = filename.slice(0, offset);
      filename = filename.slice(offset + 1, filename.length);
    }

		data = {
			name: filename,
			mode: utils.pad(mode, 7),
			uid: utils.pad(uid, 7),
			gid: utils.pad(gid, 7),
			size: utils.pad(size, 11),
			mtime: utils.pad(mtime, 11),
			chksum: '        ',
			typeflag: type,
      linkname: linkname,
			magic: 'ustar',
      version: '00',
			uname: '',
			gname: '',
      prefix: prefix
		};

		if (size === -1 && opts.allowPipe) {
			utils.readAll(function (err, buf) {
				size = buf.length;
				data.size = utils.pad(size, 11);
				tape.writeData(callback, tape.createHeader(data), buf, size);
			}, input);
		} else {
			this.writeData(callback, this.createHeader(data), input, size);
		}
	}