function(buffer, start, end) {
		if(!start) start = 0;
		if(!end) end = buffer.length;
		try {
			for (var i = start; i < end; i++) {
				switch(_parser.state) {
					case HEADER:
						if(_loc == FCGI_HEADER_LEN - 1) {
							var header = _record.header;
							_header[_loc] = buffer[i];
							var j = 0;
							header.version = _header[j++];
							header.type = _header[j++];
							header.recordId = (_header[j++] << 8) + _header[j++];
							header.contentLength = (_header[j++] << 8) + _header[j++];
							header.paddingLength = _header[j++];
							_record.body = {};
							if(_record.header.contentLength > 0) {
								_parser.onHeader(header);
								_parser.state = BODY;
							}
							else {
								_parser.onRecord(_record);
							}
							_loc=0;
						}
						else {
							_header[_loc++] = buffer[i];
						}
						break;
					case BODY:
						if(_loc == _record.header.contentLength - 1) {
							_body[_loc] = buffer[i];
							switch(_record.header.type) {
								case FCGI_BEGIN:
									var j = 0;
									_record.body = {
										"role": (_body[j++] << 8) + _body[j++],
										"flags": _body[j++]
									}
									break;
								case FCGI_ABORT:
									break;
								case FCGI_END:
									var j = 0;
									_record.body = {
										"status": (_body[j++] << 24) + (_body[j++] << 16) + (_body[j++] << 8) + _body[j++],
										"protocolStatus": _body[j++]
									}
									break;
								case FCGI_PARAMS:
								case FCGI_GET_VALUES:
								case FCGI_GET_VALUES_RESULT:
									var j = 0, name = "", value = "", vlen = 0, nlen = 0;
									_record.body.params = {};
									var rlen = _record.header.contentLength;
									while(j < rlen) {
										nlen = _body[j];
										if(nlen >> 7 == 1) {
											nlen = ((_body[j++] << 24) + (_body[j++] << 16) + (_body[j++] << 8) + _body[j++]) & 0x7fffffff;
										}
										else {
											j++;
										}
										vlen = _body[j];
										if(vlen >> 7 == 1) {
											vlen = ((_body[j++] << 24) + (_body[j++] << 16) + (_body[j++] << 8) + _body[j++]) & 0x7fffffff;
										}
										else {
											j++;
										}
										if((j + nlen + vlen) <= _body.length) {
											var nv = _body.asciiSlice(j, j + nlen + vlen);
											j += (nlen + vlen);
											name = nv.substring(0, nlen);
											value = nv.substring(nlen);
											_parser.onParam(name, value);
											_record.body.params[name] = value;
										}
										else {
											_parser.onError(new Error(JSON.stringify(BUFFER_OVERRUN)));
											j = rlen;
										}
									}
									break;
								case FCGI_STDIN:
								case FCGI_STDOUT:
								case FCGI_STDERR:
								case FCGI_DATA:
									switch(_parser.encoding) {
										case "utf8":
											_record.body = _body.utf8Slice(0, _record.header.contentLength);
											break;
										case "ascii":
											_record.body = _body.asciiSlice(0, _record.header.contentLength);
											break;
										default:
											_parser.onBody(_body, 0, _record.header.contentLength);
											break;
									}
									break;
								case FCGI_UNKNOWN_TYPE:
								default:
									_record.body = {
										"type": _body[0]
									}
									break;
							}
							_parser.onRecord(_record);
							_loc = 0;
							if(_record.header.paddingLength > 0) {
								_parser.state = PADDING;
							}
							else {
								_parser.state = HEADER;
							}
						}
						else {
							_body[_loc++] = buffer[i];
						}
						break;
					case PADDING:
						if(_loc++ == _record.header.paddingLength - 1) {
							_parser.state = HEADER;
							_loc = 0;
						}
						break;
				}
			}
		}
		catch(ex) {
			console.log(ex);
		}
	}