function (query, index, comment) {
  var self = this
	if (index == undefined) index = '*';
	if (comment == undefined) comment = '';
	assert.equal(typeof query, 'string');
	var req = []
	req.push(pack('>LLLL', [self._offset, self._limit, self._mode, self._ranker]))
	if (self._ranker == SphinxClient.SPH_RANK_EXPR) {
		req.push(pack('>L', [len(self._rankexpr)]))
		req.push(self._rankexpr)
	}
	req.push(pack('>L', [self._sort]))
	req.push(pack('>L', [len(self._sortby)]))
	req.push(self._sortby)
	// TODO : check if query is encoding in utf8

	req.push(pack('>L', [len(query)]))
	req.push(query)

	req.push(pack('>L', [len(self._weights)]))
	forEach(self._weights, function (item, index) {
			req.push(pack('>L', [item])) // FIXME / TO VERIFY
	});
	req.push(pack('>L', [len(index)]))
	req.push(index)
	req.push(pack('>L', [1])) // id64 range marker

  //    req.push(pack('>Q',  [self._min_id]))
  req.push(packUInt64(self._min_id))
  //    req.push(pack('>Q', [self._max_id]))
  req.push(packUInt64(self._max_id))

	// filters
	req.push(pack('>L', [len(self._filters)]))
	forEach(self._filters, function (f, index) {
			req.push(pack('>L', [len(f.attr)]))
			req.push(f.attr)
			filtertype = f.type
			req.push(pack('>L', [filtertype]))
			if (filtertype == SphinxClient.SPH_FILTER_VALUES) {
				req.push(pack('>L', [len(f.values)]))
				forEach(f.values, function (val, index) {
            //            req.push(pack('>q', [val]))
            req.push(packUInt64(val))
				});
			} else if (filtertype == SphinxClient.SPH_FILTER_RANGE) {
        //        req.push(pack('>q', [f.min]))
        req.push(packUInt64(f.min))
        //        req.push(pack('>q', [f.max]))
        req.push(packUInt64(f.max))
			}
			else if (filtertype == SphinxClient.SPH_FILTER_FLOATRANGE) {
				req.push(pack ('>f', [f.min]))
				req.push(pack ('>f', [f.max]))
				req.push(pack('>L', [f.exclude]))
			}
	});

	// group-by, max-matches, group-sort
	req.push(pack('>LL', [self._groupfunc, len(self._groupby)]))
	req.push(self._groupby)
	req.push(pack('>LL', [self._maxmatches, len(self._groupsort)]))
	req.push(self._groupsort)
	req.push(pack('>LLL', [self._cutoff, self._retrycount, self._retrydelay]))
	req.push(pack('>L', [len(self._groupdistinct)]))
	req.push(self._groupdistinct)

	// anchor point
	if (len(self._anchor) == 0) {
		req.push(pack('>L', [0]))
	}
	else {
		req.push(pack('>L', [1]))
		req.push(pack('>L', [len(self._anchor.attrlat) + self._anchor.attrlat]))
		req.push(pack('>L', [len(self._anchor.attrlong) + self._anchor.attrlong]))
		req.push(pack('>f', [self._anchor.lat]))
	   	req.push(pack('>f', [self._anchor.long]))
	}

	// per-index weights
	req.push(pack('>L', [len(self._indexweights)]))

	forEach(self._indexweights, function (index, weight) {
			req.push(pack('>L', [len(index)]))
			req.push(index)
			req.push(pack('>L', [weight]))
	});

	// max query time
	req.push(pack('>L', [self._maxquerytime]))

	// per-field weights
	req.push(pack('>L', [len(self._fieldweights)]))
	forEach(self._fieldweights, function (field, weight) {
			req.push(pb.pack('>L', [len(field)]))
			req.push(field)
			req.push(pack('>L', [weight]))
	});

	// comment
	req.push(pack('>L', [len(comment)]))
	req.push(comment)

	// attribute overrides
	req.push(pack('>L', [len(self._overrides)]))

	forEach(self._overrides, function (index, v) {
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
	});

	// select-list
	req.push(pack('>L', [len(self._select)]))
	req.push(self._select)

	// send query, get response
	req = req.reduce(ReduceBuffer, new Buffer(''));

	self._reqs.push(req)

	debug('New Request Added', req.toString());
	return self._reqs.length - 1
}