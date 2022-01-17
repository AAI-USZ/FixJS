function(chunk) {
					if (content == undefined) {
						client_say('received the response');
						response = unpack('>2HL', chunk)
						server_say('>2HL',response);
						state   = response[0]
						version = response[1]
						length  = response[2]
						content = chunk.slice(8)
						client_say('processing the response #1', state, version, length);
					}
					else {
						client_say('received following the response ');
						content = ConcatBuffer(content, chunk)
					}
					if (content.length >= length) {
						var err = null
						client_say('processing the response #2', state, version);
						
						if (state == SphinxClient.SEARCHD_WARNING) {
							var wend = 4 + unpack('>L', content)
							warning = content.slice(4, wend);
							// TODO do something with the warning !!!
						}
						else if (state == SphinxClient.SEARCHD_ERROR) {
							err = new Error('searchd error: '+content.slice(4).toString());
							content = null;
						}
						else if (state == SphinxClient.SEARCHD_RETRY) {
							err = new Error('temporary searchd error: '+content.slice(4).toString())
							content = null;
						}
						else if (state != SphinxClient.SEARCHD_OK) {
							err = new Error('unknown status code '+state)
							content = null;
						}

						if (version < client_ver) {
							var warning = util.format('searchd command v.%d.%d older than client\'s v.%d.%d, some options might not work',
								version>>8, version&0xff, client_ver>>8, client_ver&0xff)
							// TODO do something with the warning !!!
						}

						client.end()
						fn(err, content)
					}
			}