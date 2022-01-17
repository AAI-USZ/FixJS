function() {
		var req = Echo.StreamServer.API.request({
			"endpoint": "search",
			"data": $.extend({}, this.params)
		});
		QUnit.ok(req._isWaitingForData({"result": "error", "errorCode": "view_limit", "extra": {}}), "Checking if error responsed JSON contains waiting error code");
		QUnit.ok(req._isErrorWithTimer({"result": "error", "errorCode": "view_update_capacity_exceeded", "extra": {}}), "Checking if error responsed JSON contains error timer code");
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
		}, "Check decompiler from AS to KVL with post and metadata");
		QUnit.deepEqual(req._AS2KVL(this.items.postWithMetadata.slice(1)), [
			{
				"content": "tag1,tag2,tag3",
				"avatar": "http://my.nymag.com/thenext_mrsbass/picture?type=square",
				"markers": "marker1,marker2,marker3",
				"name": "TheNext_MrsBass",
				"source": undefined,
				"tags": "tag1,tag2,tag3",
				"target": "http://nymag.com/daily/intel/2012/06/nora-ephron-1941-2012.html",
				"verb": "tag",
				"type": "tag",
				"itemURIPattern": ""
			}, {
				"content": "marker1,marker2,marker3",
				"avatar": "http://my.nymag.com/thenext_mrsbass/picture?type=square",
				"markers": "marker1,marker2,marker3",
				"name": "TheNext_MrsBass",
				"source": undefined,
				"tags": "tag1,tag2,tag3",
				"target": "http://nymag.com/daily/intel/2012/06/nora-ephron-1941-2012.html",
				"verb": "tag",
				"type": "marker",
				"itemURIPattern": ""
			}
		], "Check decompiler from AS to KVL with metadata only");
		req._changeLiveUpdatesTimeout({
			"liveUpdatesTimeout": 4
		});
		QUnit.equal(5, req.config.get("liveUpdatesTimeout"), "Checking liveUpdatesTimeout when server responsed less value than default");
		req._changeLiveUpdatesTimeout({
			"liveUpdatesTimeout": 6
		});
		QUnit.equal(6, req.config.get("liveUpdatesTimeout"), "Checking liveUpdatesTimeout when server responsed more value than default");
	}