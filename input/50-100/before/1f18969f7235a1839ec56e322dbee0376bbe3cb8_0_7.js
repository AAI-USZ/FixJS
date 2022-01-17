function(value, id) {
					req.push(pack('>Q', [id]) )
					if (v['type'] == SphinxClient.SPH_ATTR_FLOAT) {
						req.push(pack('>f', [value]))
					}
					else if (v['type'] == SphinxClient.SPH_ATTR_BIGINT) {
						req.push(pack('>q', [value]))
					}
					else {
						req.push(pack('>l', [value]))
					}
			}