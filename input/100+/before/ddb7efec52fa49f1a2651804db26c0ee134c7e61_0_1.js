function(jEv) {
			if(! this._validateJson_handler()) return;
			if(jEv && jEv.originalEvent) { // if the user click request
				if(this.timer) {
					window.clearTimeout(this.timer); // stop any cron jobs
				}
				delete this.prevData; // remove data from previous cron runs
				this.outEl.text(acx.text("AnyRequest.Requesting"));
				var path = this.pathEl.val(),
						type = this.typeEl.val(),
						query = JSON.stringify(JSON.parse(this.dataEl.val())),
						transform = this.transformEl.val();
				for(var i = 0; i < this.history.length; i++) {
					if(this.history[i].path === path
							&& this.history[i].type === type
							&& this.history[i].query === query
							&& this.history[i].transform === transform) {
						this.history.splice(i, 1);
					}
				}
				this.history.push({
					path: path,
					type: type,
					query: query,
					transform: transform
				});
				this.history.slice(250); // make sure history does not get too large
				es.storage.set("anyRequestHistory", this.history);
				this.el.find("UL.anyRequest-history")
					.empty()
					.append($( { tag: "UL", children: this.history.map(this._historyItem_template, this) }).children())
					.children().find(":last-child").each(function(i, j) { j.scrollIntoView(false); }).end()
					.scrollLeft(0);
			}
			this.config.cluster.request({
				url: this.base_uriEl.val() + path,
				type: type,
				data: query,
				success: this._responseWriter_handler
			});
		}