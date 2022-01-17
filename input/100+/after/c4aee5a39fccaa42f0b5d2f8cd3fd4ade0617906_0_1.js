function onSuccess(resp) {
			if(opts.response_item == null || opts.response_item == '') {
				opts.response_item = 'items';
				if(typeof resp.items == "undefined" && typeof resp == "object") {
					resp.items = resp;
				}
			}
			if (typeof resp.offset == "undefined" || resp.offset == null) {
				resp.offset = this.fromPage * opts.pagesize;
			}
			if (typeof resp.count == "undefined" || resp.count == null) {
				resp.count = resp[opts.response_item].length;
			}
			if (typeof resp.total !== "undefined" && !isNaN(resp.total)) {
				data.length = resp.total;
			}
			
			for (var i = 0; i < resp[opts.response_item].length; i++) {
				data[resp.offset + i] = resp[opts.response_item][i];
				data[resp.offset + i].index = resp.offset + i;
			}

			req = null;
			onDataLoaded.notify({from:resp.offset, to:resp.offset + resp.count});
		}