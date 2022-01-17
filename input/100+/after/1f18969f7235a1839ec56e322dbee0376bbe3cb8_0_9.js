function (err, response) {

		if (response === undefined) {
			return fn(err, results)
		}

		// parse response
		var max_ = response.length
		var p = 0
		var results = []
		for (var i = 0; i < nreqs; i++) {
			debug('Parsing request #'+i)
			var result = {}
			results.push(result)

			result['error'] = ''
			result['warning'] = ''
			result['status'] = unpack('>L', response.slice(p, p + 4))
			p += 4
			if (result['status'] != SphinxClient.SEARCHD_OK) {
				length = Number(unpack('>L', response.slice(p, p + 4)))
				p += 4
				message = response.slice(p, p+length)
				p += length

				if (result['status'] == SphinxClient.SEARCHD_WARNING) {
					result['warning'] = message.toString()
				}
				else {
					result['error'] = message.toString()
					continue
				}
			}
			// read schema
			result['fields'] = []
			var attrs = []

			var nfields = Number(unpack('>L', response.slice(p, p + 4)))
			p += 4
			while (nfields > 0 && p < max_) {
				nfields -= 1
				length = Number(unpack('>L', response.slice(p, p + 4)))
				p += 4
				result['fields'].push(response.slice(p, p + length).toString())
				p += length
			}

			var nattrs = Number(unpack('>L', response.slice(p, p + 4)))

			p += 4
			while (nattrs>0 && p<max_) {
				nattrs -= 1
				length = Number(unpack('>L', response.slice(p, p + 4)))
				p += 4
				var attr = response.slice(p, p + length).toString()
				p += length
				var type_ = Number(unpack('>L', response.slice(p, p + 4)))
				p += 4
				attrs.push([attr, type_])
			}
			result['attrs'] = attrs

			// read match count
			var count = Number(unpack('>L', response.slice(p, p + 4)))
			p += 4
			var id64 = Number(unpack('>L', response.slice(p, p + 4)))
			p += 4

			// read matches
			result['matches'] = []
			while (count>0 && p<max_) {
				var doc, weight
				count -= 1
        if (id64) {
          // doc = Number(unpack('>q', response.slice(p, p + 8)))
          doc = Number(unpackInt64(response.slice(p, p + 8)))
          server_say('>q',doc)
					p += 8
          weight = Number(unpack('>L', response.slice(p, p + 4)))
					p += 4
				}
				else {
					doc = Number(unpack('>L', response.slice(p, p + 4)))
					p += 4
				   	weight = Number(unpack('>L', response.slice(p, p + 4)))
					p += 4
				}

				var match = { 'id':doc, 'weight':weight, 'attrs':{} }
				for (var i = 0; i < result['attrs'].length; i++) {
					var attr0 = attrs[i][0]
					if (attrs[i][1] == SphinxClient.SPH_ATTR_FLOAT) {
						match['attrs'][attr0] = Number(unpack('>f', response.slice(p, p + 4)))
					}
					else if (attrs[i][1] == SphinxClient.SPH_ATTR_BIGINT) {
            //            match['attrs'][attr0] = Number(unpack('>q', response.slice(p, p + 8)))
            match['attrs'][attr0] = Number(unpackInt64(response.slice(p, p + 8)))
						p += 4
					}
					else if (attrs[i][1] == SphinxClient.SPH_ATTR_STRING) {
						var slen = Number(unpack('>L', response.slice(p, p + 4)))
						p += 4
						match['attrs'][attr0] = ''
						if (slen>0) {
							match['attrs'][attr0] = response.slice(p, p + slen).toString()
						}
						p += slen-4
					}
					else if (attrs[i][1] == SphinxClient.SPH_ATTR_MULTI) {
						match['attrs'][attr0] = []
						var  nvals = Number(unpack('>L', response.slice(p, p + 4)))
						p += 4
						for (var n = 0; n > nvals; n++) {
							match['attrs'][attr0].push(Number(unpack('>L', response.slice(p, p + 4))))
							p += 4
							p -= 4
						}
					}
					else if (attrs[i][1] == SphinxClient.SPH_ATTR_MULTI64) {
						match['attrs'][attr0] = []
						nvals = Number(unpack('>L', response.slice(p, p + 4)))
						nvals = nvals/2
						p += 4
						for (var n = 0; n < nvals; n++) {
              //              match['attrs'][attr0].push(Number(unpack('>q', response.slice(p, p + 8))))
              match['attrs'][attr0].push(Number(unpackInt64(response.slice(p, p + 8))))
							p += 8
							p -= 4
						}
					}
					else {
						match['attrs'][attr0] = Number(unpack('>L', response.slice(p, p + 4)))
					}
					p += 4

				}
				result['matches'].push( match )
			}
			result['total'] = Number(unpack('>L', response.slice(p, p + 4)))
			p += 4
			result['total_found'] = Number(unpack('>L', response.slice(p, p + 4)))
			p += 4
			result['time'] = Number(unpack('>L', response.slice(p, p + 4)))
			p += 4
			var words = Number(unpack('>L', response.slice(p, p + 4)))
			p += 4

			result['time'] = (result['time']/1000.0)

			result['words'] = []
			while (words>0) {
				words -= 1
				var length = Number(unpack('>L', response.slice(p, p + 4)))
				p += 4
				var word = response.slice(p, p + length).toString()
				p += length
				var docs = Number(unpack('>L', response.slice(p, p + 4)))
				p += 4
				var hits = Number(unpack('>L', response.slice(p, p + 4)))
				p += 4

				result['words'].push({'word':word, 'docs':docs, 'hits':hits})
			}
		}
		self._reqs = []

		fn(err, results)
	}