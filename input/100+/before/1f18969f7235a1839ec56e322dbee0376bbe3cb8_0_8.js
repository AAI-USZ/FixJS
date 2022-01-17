function(query, index, comment) {
	if (index == undefined) index = '*';
	if (comment == undefined) comment = '';
	assert.equal(typeof query, 'string');
	var req = []
	req.push(pack('>LLLL', [this._offset, this._limit, this._mode, this._ranker]))
	if (this._ranker == SphinxClient.SPH_RANK_EXPR) {
		req.push(pack('>L', [len(this._rankexpr)]))
		req.push(this._rankexpr)
	}
	req.push(pack('>L', [this._sort]))
	req.push(pack('>L', [len(this._sortby)]))
	req.push(this._sortby)
	// TODO : check if query is encoding in utf8

	req.push(pack('>L', [len(query)]))
	req.push(query)

	req.push(pack('>L', [len(this._weights)]))
	forEach(this._weights, function(item, index) {
			req.push(pack('>L', [item])) // FIXME / TO VERIFY
	});
	req.push(pack('>L', [len(index)]))
	req.push(index)
	req.push(pack('>L', [1])) // id64 range marker


req.push(Put().word64be(this._min_id).word64be(this._max_id).buffer())
//    req.push(pack('>Q',  [this._min_id]))
//    req.push(pack('>Q', [this._max_id]))

	// filters
	req.push(pack('>L', [len(this._filters)]))
	forEach(this._filters, function(f, index) {
			req.push(pack('>L', [len(f.attr)]))
			req.push(f.attr)
			filtertype = f.type
			req.push(pack('>L', [filtertype]))
			if (filtertype == SphinxClient.SPH_FILTER_VALUES) {
				req.push(pack('>L', [len(f.values)]))
				forEach(f.values, function(val, index) {
						req.push(pack('>q', [val]))
				});
			} else if (filtertype == SphinxClient.SPH_FILTER_RANGE) {
				req.push(pack('>qq', [f.min, f.max]))
			}
			else if (filtertype == SphinxClient.SPH_FILTER_FLOATRANGE) {
				req.push(pack ('>ff', [f.min, f.max]))
				req.push(pack('>L', [f.exclude]))
			}
	});

	// group-by, max-matches, group-sort
	req.push(pack('>LL', [this._groupfunc, len(this._groupby)]))
	req.push(this._groupby)
	req.push(pack('>LL', [this._maxmatches, len(this._groupsort)]))
	req.push(this._groupsort)
	req.push(pack('>LLL', [this._cutoff, this._retrycount, this._retrydelay])) 
	req.push(pack('>L', [len(this._groupdistinct)]))
	req.push(this._groupdistinct)

	// anchor point
	if (len(this._anchor) == 0) {
		req.push(pack('>L', [0]))
	}
	else {
		req.push(pack('>L', [1]))
		req.push(pack('>L', [len(this._anchor.attrlat) + this._anchor.attrlat]))
		req.push(pack('>L', [len(this._anchor.attrlong) + this._anchor.attrlong]))
		req.push(pack('>f', [this._anchor.lat]))
	   	req.push(pack('>f', [this._anchor.long]))
	}

	// per-index weights
	req.push(pack('>L', [len(this._indexweights)]))

	forEach(this._indexweights, function(index, weight) {
			req.push(pack('>L', [len(index)]))
			req.push(index)
			req.push(pack('>L', [weight]))
	});

	// max query time
	req.push(pack('>L', [this._maxquerytime]))

	// per-field weights
	req.push(pack('>L', [len(this._fieldweights)]))
	forEach(this._fieldweights, function(field, weight) {
			req.push(pb.pack('>L', [len(field)]))
			req.push(field)
			req.push(pack('>L', [weight]))
	});

	// comment
	req.push(pack('>L', [len(comment)]))
	req.push(comment)

	// attribute overrides
	req.push(pack('>L', [len(this._overrides)]))

	forEach(this._overrides, function(index, v) {
			req.push(pack('>L', [len(v['name'])]))
			req.push(v['name'])
			req.push(pack('>LL', [v['type'], len(v['values'])]))
			forEach(v['values'], function(value, id) {
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
			});
	});

	// select-list
	req.push(pack('>L', [len(this._select)]))
	req.push(this._select)

	// send query, get response
	req = req.reduce(ReduceBuffer, new Buffer(''));

	this._reqs.push(req)

	debug('New Request Added', req.toString());
	return this._reqs.length - 1 
}