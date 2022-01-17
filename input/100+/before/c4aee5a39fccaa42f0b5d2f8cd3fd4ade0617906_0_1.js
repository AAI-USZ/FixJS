function onSuccess(resp) {
			var from = this.fromPage*PAGESIZE, to = from + resp.count;
			data.length = parseInt(resp.total);

			for (var i = 0; i < resp.stories.length; i++) {
				data[from + i] = resp.stories[i];
				data[from + i].index = from + i;
			}

			req = null;

			onDataLoaded.notify({from:from, to:to});
		}