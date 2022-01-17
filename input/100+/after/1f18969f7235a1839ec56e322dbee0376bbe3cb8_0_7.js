function (index, v) {
			req.push(pack('>L', [len(v['name'])]))
			req.push(v['name'])
			req.push(pack('>LL', [v['type'], len(v['values'])]))
			forEach(v['values'], function (value, id) {
          //          req.push(pack('>Q', [id]))
          req.push(packUInt64(id))
					if (v['type'] == SphinxClient.SPH_ATTR_FLOAT) {
						req.push(pack('>f', [value]))
					}
					else if (v['type'] == SphinxClient.SPH_ATTR_BIGINT) {
            //            req.push(pack('>q', [value]))
            req.push(packInt64(id))
					}
					else {
						req.push(pack('>l', [value]))
					}
			});
	}