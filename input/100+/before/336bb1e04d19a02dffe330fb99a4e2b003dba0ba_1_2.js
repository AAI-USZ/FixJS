function() {
		var req = Echo.StreamServer.API.request({
			"endpoint": "search",
			"data": $.extend({}, this.params)
		});

		QUnit.deepEqual(req._AS2KVL(this.items.post), {
			"content": "For the record, I think your neck looked just fine.\n\nPeace out, Nora.",
			"avatar": "http://my.nymag.com/thenext_mrsbass/picture?type=square",
			"markers": undefined,
			"name": "TheNext_MrsBass",
			"source": {
				"name": "aboutecho.com",
				"uri": "http://aboutecho.com/"
			},
			"tags": undefined,
			"target": "http://nymag.com/daily/intel/2012/06/nora-ephron-1941-2012.html",
			"verb": "post",
			"type": "comment",
			"itemURIPattern": ""
		}, "Check decompiler from AS to KVL");
		QUnit.deepEqual(req._AS2KVL(this.items.postWithMetadata), {
			"content": "For the record, I think your neck looked just fine.\n\nPeace out, Nora.",
			"avatar": "http://my.nymag.com/thenext_mrsbass/picture?type=square",
			"markers": "marker1,marker2,marker3",
			"name": "TheNext_MrsBass",
			"source": {
				"name": "aboutecho.com",
				"uri": "http://aboutecho.com/"
			},
			"tags": "tag1,tag2,tag3",
			"target": "http://nymag.com/daily/intel/2012/06/nora-ephron-1941-2012.html",
			"verb": "post",
			"type": "comment",
			"itemURIPattern": ""
		}, "Check decompiler from AS to KVL with metadata");
	}